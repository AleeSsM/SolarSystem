import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { getPlanetById } from '../data/planets'
import { useAppStore } from '../store/useAppStore'
import {
  CAMERA_LIMITS,
  SUN_VIEW,
  SYSTEM_OVERVIEW,
  TRANSITION_THRESHOLD,
  getFollowCameraOffset,
  getFollowDistanceFromZoom,
  getFollowZoomFromDistance,
  getFollowZoomLimits,
  smoothDampFactor,
} from './constants'
import { getPlanetPosition } from './getPlanetPosition'
import {
  INTRO_DURATIONS,
  INTRO_START,
  sampleIntroFrame,
  type IntroStage,
} from './introSequence'
import {
  TRAVEL_DURATIONS,
  sampleTravelFrame,
  type TravelStage,
} from './travelSequence'

function updateFollowTargets(
  planetId: string,
  desiredTarget: Vector3,
  desiredCameraPos: Vector3,
  followZoom: number,
) {
  const planet = getPlanetById(planetId)
  if (!planet) return false

  const target = new Vector3(...getPlanetPosition(planet))
  const dist = getFollowDistanceFromZoom(planet.radius, followZoom)
  const offset = getFollowCameraOffset(planet.radius).normalize().multiplyScalar(dist)
  desiredTarget.copy(target)
  desiredCameraPos.copy(target.clone().add(offset))
  return true
}

export function CameraRig() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()

  const cameraMode = useAppStore((s) => s.cameraMode)
  const followPlanetId = useAppStore((s) => s.followPlanetId)
  const cameraTransition = useAppStore((s) => s.cameraTransition)
  const phase = useAppStore((s) => s.phase)
  const introActive = useAppStore((s) => s.introActive)
  const travelActive = useAppStore((s) => s.travelActive)
  const followZoom = useAppStore((s) => s.followZoom)

  const desiredCameraPos = useRef(new Vector3())
  const desiredTarget = useRef(new Vector3())
  const transitionActive = useRef(false)
  const skipFollowZoomApply = useRef(false)

  const introStage = useRef<IntroStage>('void')
  const introElapsed = useRef(0)
  const introHoldElapsed = useRef(0)
  const introPos = useRef(new Vector3().copy(INTRO_START.position))
  const introTarget = useRef(new Vector3().copy(INTRO_START.target))

  const travelStage = useRef<TravelStage>('approach')
  const travelElapsed = useRef(0)
  const travelStartPos = useRef(new Vector3())
  const travelStartTarget = useRef(new Vector3())
  const travelPos = useRef(new Vector3())
  const travelTarget = useRef(new Vector3())
  const lastTravelRequestId = useRef(-1)

  useEffect(() => {
    introStage.current = 'void'
    introElapsed.current = 0
    introHoldElapsed.current = 0
    introPos.current.copy(INTRO_START.position)
    introTarget.current.copy(INTRO_START.target)
    if ('fov' in camera) {
      camera.fov = 52
      camera.updateProjectionMatrix()
    }
  }, [camera])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls || travelActive) return

    if (cameraMode === 'follow' && followPlanetId) {
      const planet = getPlanetById(followPlanetId)
      if (planet) {
        const limits = getFollowZoomLimits(planet.radius)
        controls.minDistance = limits.minDistance
        controls.maxDistance = limits.maxDistance
      }
    } else {
      controls.minDistance = CAMERA_LIMITS.minDistance
      controls.maxDistance = CAMERA_LIMITS.maxDistance
    }
  }, [cameraMode, followPlanetId, travelActive])

  useEffect(() => {
    if (cameraTransition === 'follow' && followPlanetId && !travelActive) {
      const { followZoom } = useAppStore.getState()
      updateFollowTargets(followPlanetId, desiredTarget.current, desiredCameraPos.current, followZoom)
      transitionActive.current = true
      return
    }

    if (cameraTransition === 'overview') {
      desiredCameraPos.current.copy(SYSTEM_OVERVIEW.position)
      desiredTarget.current.copy(SYSTEM_OVERVIEW.target)
      transitionActive.current = true
      return
    }

    if (cameraTransition === 'sun') {
      desiredCameraPos.current.copy(SUN_VIEW.position)
      desiredTarget.current.copy(SUN_VIEW.target)
      transitionActive.current = true
    }
  }, [cameraTransition, followPlanetId, travelActive])

  useEffect(() => {
    if (cameraMode !== 'follow' || !followPlanetId || introActive || travelActive) return
    if (skipFollowZoomApply.current) {
      skipFollowZoomApply.current = false
      return
    }
    const controls = controlsRef.current
    if (!controls) return
    const planet = getPlanetById(followPlanetId)
    if (!planet) return

    const dist = getFollowDistanceFromZoom(planet.radius, followZoom)
    const offset = camera.position.clone().sub(controls.target)
    if (offset.lengthSq() < 0.001) {
      offset.copy(getFollowCameraOffset(planet.radius))
    }
    offset.normalize().multiplyScalar(dist)
    camera.position.copy(controls.target).add(offset)
    controls.update()
  }, [cameraMode, followPlanetId, introActive, travelActive, followZoom, camera])

  useFrame((_, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    const state = useAppStore.getState()
    const {
      completeCameraTransition,
      setIntroTitleVisible,
      finishIntro,
      setTravelTitleVisible,
      finishTravel,
      setFollowZoom,
    } = state

    if (state.introActive) {
      introElapsed.current += delta

      const stage = introStage.current
      const duration = INTRO_DURATIONS[stage]
      const t = Math.min(1, introElapsed.current / duration)
      const holdElapsed = stage === 'hold' ? introHoldElapsed.current : 0

      const fov = sampleIntroFrame(stage, t, holdElapsed, introPos.current, introTarget.current)

      camera.position.copy(introPos.current)
      controls.target.copy(introTarget.current)

      if ('fov' in camera) {
        camera.fov += (fov - camera.fov) * Math.min(1, delta * 4)
        camera.updateProjectionMatrix()
      }

      if (stage === 'hold') {
        introHoldElapsed.current += delta
      }

      if (t >= 1) {
        if (stage === 'void') {
          introStage.current = 'swoop'
          introElapsed.current = 0
        } else if (stage === 'swoop') {
          introStage.current = 'hero'
          introElapsed.current = 0
        } else if (stage === 'hero') {
          introStage.current = 'hold'
          introElapsed.current = 0
          introHoldElapsed.current = 0
          setIntroTitleVisible(true)
        } else if (stage === 'hold') {
          introStage.current = 'pullback'
          introElapsed.current = 0
          setIntroTitleVisible(false)
        } else {
          finishIntro()
        }
      }

      controls.update()
      return
    }

    if (state.travelActive && state.travelPlanetId) {
      const planet = getPlanetById(state.travelPlanetId)
      if (!planet) {
        finishTravel()
        controls.update()
        return
      }

      if (state.travelRequestId !== lastTravelRequestId.current) {
        lastTravelRequestId.current = state.travelRequestId
        travelStage.current = 'approach'
        travelElapsed.current = 0
        travelStartPos.current.copy(camera.position)
        travelStartTarget.current.copy(controls.target)
        travelPos.current.copy(camera.position)
        travelTarget.current.copy(controls.target)
        transitionActive.current = false
        camera.position.copy(travelPos.current)
        controls.target.copy(travelTarget.current)
        controls.update()
      }

      travelElapsed.current += delta
      const stage = travelStage.current
      const duration = TRAVEL_DURATIONS[stage]
      const t = Math.min(1, travelElapsed.current / duration)
      const planetPos = new Vector3(...getPlanetPosition(planet))

      const fov = sampleTravelFrame(
        stage,
        t,
        planetPos,
        planet.radius,
        travelStartPos.current,
        travelStartTarget.current,
        travelPos.current,
        travelTarget.current,
      )

      camera.position.copy(travelPos.current)
      controls.target.copy(travelTarget.current)

      if ('fov' in camera) {
        camera.fov += (fov - camera.fov) * Math.min(1, delta * 5)
        camera.updateProjectionMatrix()
      }

      if (stage === 'reveal' && !state.travelTitleVisible) {
        setTravelTitleVisible(true)
      }

      if (t >= 1) {
        if (stage === 'approach') {
          travelStage.current = 'reveal'
          travelElapsed.current = 0
          setTravelTitleVisible(true)
        } else if (stage === 'reveal') {
          setTravelTitleVisible(false)
          const dist = camera.position.distanceTo(controls.target)
          skipFollowZoomApply.current = true
          setFollowZoom(getFollowZoomFromDistance(planet.radius, dist))
          const limits = getFollowZoomLimits(planet.radius)
          controls.minDistance = limits.minDistance
          controls.maxDistance = limits.maxDistance
          finishTravel()
        }
      }

      controls.update()
      return
    }

    if (transitionActive.current && cameraTransition === 'follow' && followPlanetId) {
      updateFollowTargets(
        followPlanetId,
        desiredTarget.current,
        desiredCameraPos.current,
        state.followZoom,
      )
    }

    if (transitionActive.current && cameraTransition) {
      const factor = smoothDampFactor(
        delta,
        cameraTransition === 'overview' ? 3.5 : cameraTransition === 'sun' ? 4 : 4,
      )

      camera.position.lerp(desiredCameraPos.current, factor)
      controls.target.lerp(desiredTarget.current, factor)
      controls.update()

      const posDone = camera.position.distanceTo(desiredCameraPos.current) < TRANSITION_THRESHOLD
      const targetDone = controls.target.distanceTo(desiredTarget.current) < TRANSITION_THRESHOLD

      if (posDone && targetDone) {
        transitionActive.current = false
        completeCameraTransition()
        controls.update()
      }
      return
    }

    if (cameraMode === 'follow' && followPlanetId && !state.travelActive) {
      const planet = getPlanetById(followPlanetId)
      if (planet) {
        const target = new Vector3(...getPlanetPosition(planet))
        const prevTarget = controls.target.clone()
        controls.target.lerp(target, smoothDampFactor(delta, 6))

        const targetDelta = controls.target.clone().sub(prevTarget)
        camera.position.add(targetDelta)
      }
    }

    controls.update()
  })

  const controlsEnabled = phase !== 'teacher' && !introActive && !travelActive

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      zoomSpeed={1.1}
      enableZoom
      minDistance={CAMERA_LIMITS.minDistance}
      maxDistance={CAMERA_LIMITS.maxDistance}
      maxPolarAngle={CAMERA_LIMITS.maxPolarAngle}
      enabled={controlsEnabled}
    />
  )
}
