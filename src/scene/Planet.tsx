import { useRef, useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'

import { Html, Outlines, useTexture } from '@react-three/drei'

import type { Mesh } from 'three'

import type { PlanetData } from '../data/planets'

import { computeBodyState } from '../simulation/orbit'

import { getPlanetPhaseOffset } from '../simulation/realTime'

import { getElapsedDays } from '../hooks/useSimulationClock'

import { SaturnRings } from './SaturnRings'
import { HelicalTrail, getPlanetTrailSettings } from './HelicalTrail'
import { usePlanetSurfaceMaterial } from './usePlanetSurfaceMaterial'

import { useAppStore } from '../store/useAppStore'



interface PlanetProps {

  data: PlanetData

}



export function Planet({ data }: PlanetProps) {

  const meshRef = useRef<Mesh>(null)

  const texture = useTexture(data.textureUrl)

  const { camera } = useThree()



  const selectedPlanetId = useAppStore((s) => s.selectedPlanetId)

  const hoveredPlanetId = useAppStore((s) => s.hoveredPlanetId)

  const showLabels = useAppStore((s) => s.showLabels)

  const cameraMode = useAppStore((s) => s.cameraMode)

  const setHoveredPlanet = useAppStore((s) => s.setHoveredPlanet)

  const introActive = useAppStore((s) => s.introActive)

  const travelActive = useAppStore((s) => s.travelActive)

  const timeMode = useAppStore((s) => s.timeMode)

  const planetFill = useAppStore((s) => s.planetFill)
  const helicalOrigin = useAppStore((s) => s.helicalMotionStartDays)
  const material = usePlanetSurfaceMaterial(texture, planetFill)
  const trail = getPlanetTrailSettings(data.radius, data.orbitRadius)



  const [labelFactor, setLabelFactor] = useState(14)

  const labelFactorRef = useRef(14)



  const isSelected = selectedPlanetId === data.id

  const isHovered = hoveredPlanetId === data.id

  const isHighlighted = isSelected || isHovered

  const showLabel = isHovered || isSelected || showLabels



  useFrame(() => {

    const mesh = meshRef.current

    if (!mesh) return



    const elapsed = getElapsedDays()
    const phaseOffset = getPlanetPhaseOffset(data.id, timeMode, data.orbitPhaseOffset)

    const { position, rotationY } = computeBodyState(
      elapsed,
      data.orbitRadius,
      data.orbitalPeriodDays,
      data.rotationPeriodDays,
      data.inclinationDeg,
      phaseOffset,
    )

    mesh.position.set(...position)
    mesh.rotation.y = rotationY

    if (showLabel) {

      const dist = camera.position.distanceTo(mesh.position)

      const scale = cameraMode === 'free' ? 0.48 : 0.38

      const next = Math.max(10, Math.min(52, dist * scale))

      if (Math.abs(next - labelFactorRef.current) / labelFactorRef.current > 0.07) {

        labelFactorRef.current = next

        setLabelFactor(next)

      }

    }

  })



  return (
    <HelicalTrail
      color={data.orbitColor}
      width={trail.width}
      maxPoints={trail.maxPoints}
      minSampleDist={trail.minSampleDist}
      sourceRef={meshRef}
      trailKey={`${helicalOrigin}-${data.id}`}
    >
      <mesh
        ref={meshRef}
        name={data.id}
        onPointerOver={(event) => {
        if (introActive || travelActive) return

        event.stopPropagation()

        document.body.style.cursor = 'pointer'

        setHoveredPlanet(data.id)

      }}

      onPointerOut={() => {

        if (introActive || travelActive) return

        document.body.style.cursor = 'default'

        setHoveredPlanet(null)

      }}

      onPointerDown={(event) => {

        if (introActive) return

        event.stopPropagation()

      }}

      onClick={(event) => {

        if (introActive) return

        event.stopPropagation()

        useAppStore.getState().followPlanet(data.id)

      }}

    >

      <sphereGeometry args={[data.radius, 48, 48]} />

      <primitive object={material} attach="material" />

      {data.id === 'saturn' && <SaturnRings planetRadius={data.radius} />}

      {isHighlighted && (

        <Outlines

          thickness={isSelected ? 0.12 : 0.07}

          color={data.orbitColor}

          screenspace

          opacity={1}

        />

      )}

      {showLabel && (

        <Html

          position={[0, data.radius * 1.9, 0]}

          center

          distanceFactor={labelFactor}

          zIndexRange={[100, 0]}

          style={{ pointerEvents: 'none' }}

        >

          <div

            className={`planet-label ${cameraMode === 'free' ? 'planet-label--free' : ''} ${isHovered ? 'planet-label--hover' : ''} ${isSelected ? 'planet-label--selected' : ''}`}

          >

            {data.name}

          </div>

        </Html>

      )}

      </mesh>
    </HelicalTrail>
  )
}
