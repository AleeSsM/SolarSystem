import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { Mesh } from 'three'
import type { MoonData } from '../data/moons'
import { getPlanetById } from '../data/planets'
import { getElapsedDays } from '../hooks/useSimulationClock'
import { computeBodyState, computeOrbitAngle, getCircularOrbitPosition } from '../simulation/orbit'
import { getPlanetPhaseOffset } from '../simulation/realTime'
import { MOON_SURFACE } from './planetLighting'
import { usePlanetSurfaceMaterial } from './usePlanetSurfaceMaterial'
import { useAppStore } from '../store/useAppStore'

interface MoonProps {
  data: MoonData
}

export function Moon({ data }: MoonProps) {
  const meshRef = useRef<Mesh>(null)
  const texture = useTexture(data.textureUrl)
  const timeMode = useAppStore((s) => s.timeMode)
  const planetFill = useAppStore((s) => s.planetFill)
  const material = usePlanetSurfaceMaterial(texture, planetFill, MOON_SURFACE)

  useFrame(() => {
    const mesh = meshRef.current
    const parent = getPlanetById(data.parentPlanetId)
    if (!mesh || !parent) return

    const elapsed = getElapsedDays()
    const phaseOffset = getPlanetPhaseOffset(
      parent.id,
      timeMode,
      parent.orbitPhaseOffset,
    )

    const parentState = computeBodyState(
      elapsed,
      parent.orbitRadius,
      parent.orbitalPeriodDays,
      parent.rotationPeriodDays,
      parent.inclinationDeg,
      phaseOffset,
    )

    const moonAngle = computeOrbitAngle(elapsed, data.orbitalPeriodDays)
    const local = getCircularOrbitPosition(data.orbitRadius, moonAngle)

    mesh.position.set(
      parentState.position[0] + local[0],
      parentState.position[1] + local[1],
      parentState.position[2] + local[2],
    )
    mesh.rotation.y = moonAngle
  })

  return (
    <mesh ref={meshRef} name={data.id}>
      <sphereGeometry args={[data.radius, 24, 24]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
