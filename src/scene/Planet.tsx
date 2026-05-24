import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Outlines, useTexture } from '@react-three/drei'
import type { Mesh } from 'three'
import type { PlanetData } from '../data/planets'
import { computeBodyState } from '../simulation/orbit'
import { getPlanetPhaseOffset } from '../simulation/realTime'
import { getElapsedDays } from '../hooks/useSimulationClock'
import { SaturnRings } from './SaturnRings'
import { usePlanetSurfaceMaterial } from './usePlanetSurfaceMaterial'
import { useAppStore } from '../store/useAppStore'

interface PlanetProps {
  data: PlanetData
}

export function Planet({ data }: PlanetProps) {
  const meshRef = useRef<Mesh>(null)
  const texture = useTexture(data.textureUrl)

  const selectedPlanetId = useAppStore((s) => s.selectedPlanetId)
  const hoveredPlanetId = useAppStore((s) => s.hoveredPlanetId)
  const showLabels = useAppStore((s) => s.showLabels)
  const setHoveredPlanet = useAppStore((s) => s.setHoveredPlanet)
  const followPlanet = useAppStore((s) => s.followPlanet)
  const introActive = useAppStore((s) => s.introActive)
  const timeMode = useAppStore((s) => s.timeMode)
  const planetFill = useAppStore((s) => s.planetFill)
  const material = usePlanetSurfaceMaterial(texture, planetFill)

  const isSelected = selectedPlanetId === data.id
  const isHovered = hoveredPlanetId === data.id
  const isHighlighted = isSelected || isHovered
  const showLabel = isHovered || isSelected || showLabels

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return

    const { position, rotationY } = computeBodyState(
      getElapsedDays(),
      data.orbitRadius,
      data.orbitalPeriodDays,
      data.rotationPeriodDays,
      data.inclinationDeg,
      getPlanetPhaseOffset(data.id, timeMode, data.orbitPhaseOffset),
    )

    mesh.position.set(...position)
    mesh.rotation.y = rotationY
  })

  return (
    <mesh
      ref={meshRef}
      name={data.id}
      onPointerOver={(event) => {
        if (introActive) return
        event.stopPropagation()
        document.body.style.cursor = 'pointer'
        setHoveredPlanet(data.id)
      }}
      onPointerOut={() => {
        if (introActive) return
        document.body.style.cursor = 'default'
        setHoveredPlanet(null)
      }}
      onClick={(event) => {
        if (introActive) return
        event.stopPropagation()
        followPlanet(data.id)
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
          distanceFactor={14}
          zIndexRange={[100, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`planet-label ${isHovered ? 'planet-label--hover' : ''} ${isSelected ? 'planet-label--selected' : ''}`}
          >
            {data.name}
          </div>
        </Html>
      )}
    </mesh>
  )
}
