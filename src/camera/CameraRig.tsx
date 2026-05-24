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
  getFollowZoomLimits,
  smoothDampFactor,
} from './constants'
import { getPlanetPosition } from './getPlanetPosition'

function updateFollowTargets(
  planetId: string,
  desiredTarget: Vector3,
  desiredCameraPos: Vector3,
) {
  const planet = getPlanetById(planetId)
  if (!planet) return false

  const target = new Vector3(...getPlanetPosition(planet))
  const offset = getFollowCameraOffset(planet.radius)
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

  const desiredCameraPos = useRef(new Vector3())
  const desiredTarget = useRef(new Vector3())
  const transitionActive = useRef(false)

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

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
  }, [cameraMode, followPlanetId])

  useEffect(() => {
    if (cameraTransition === 'follow' && followPlanetId) {
      updateFollowTargets(followPlanetId, desiredTarget.current, desiredCameraPos.current)
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
  }, [cameraTransition, followPlanetId])

  useFrame((_, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    const completeTransition = useAppStore.getState().completeCameraTransition

    if (transitionActive.current && cameraTransition === 'follow' && followPlanetId) {
      updateFollowTargets(followPlanetId, desiredTarget.current, desiredCameraPos.current)
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
        completeTransition()
        controls.update()
      }
      return
    }

    if (cameraMode === 'follow' && followPlanetId) {
      const planet = getPlanetById(followPlanetId)
      if (planet) {
        const target = new Vector3(...getPlanetPosition(planet))
        const prevTarget = controls.target.clone()
        controls.target.lerp(target, smoothDampFactor(delta, 6))

        // Mover la camara junto con el planeta para no desplazar el zoom del usuario
        const targetDelta = controls.target.clone().sub(prevTarget)
        camera.position.add(targetDelta)
      }
    }

    controls.update()
  })

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
      enabled={phase !== 'teacher'}
    />
  )
}
