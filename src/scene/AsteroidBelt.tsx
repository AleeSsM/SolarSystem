import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { auToOrbitRadius } from '../data/scales'
import { getElapsedDays } from '../hooks/useSimulationClock'
import { EARTH_ORBIT_DAYS } from '../simulation/constants'
import { computeOrbitAngle, computeRotation } from '../simulation/orbit'

const ASTEROID_COUNT = 520
const INNER_AU = 2.15
const OUTER_AU = 3.25

const ASTEROID_PALETTE = ['#9a8a72', '#b8a088', '#7a6a58', '#c4a882', '#6e6254', '#a89070']

function rng(seed: number, n: number) {
  const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function beltOrbitalPeriodDays(au: number) {
  return EARTH_ORBIT_DAYS * au ** 1.5
}

export function AsteroidBelt() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dustRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const seeds = useMemo(() => {
    return Array.from({ length: ASTEROID_COUNT }, (_, i) => {
      const au = INNER_AU + rng(i, 1) * (OUTER_AU - INNER_AU)
      const radius = auToOrbitRadius(au)
      const angle = rng(i, 2) * Math.PI * 2
      const y = (rng(i, 3) - 0.5) * 1.8
      const size = 0.05 + rng(i, 4) * 0.14
      const color = ASTEROID_PALETTE[Math.floor(rng(i, 5) * ASTEROID_PALETTE.length)]
      const spin = rng(i, 6) * Math.PI * 2
      const spinRateDays = 0.4 + rng(i, 7) * 1.6
      return {
        radius,
        angle,
        y,
        size,
        color,
        spin,
        orbitalPeriodDays: beltOrbitalPeriodDays(au),
        spinRateDays,
      }
    })
  }, [])

  const dustSeeds = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => {
      const au = INNER_AU + rng(i + 500, 1) * (OUTER_AU - INNER_AU)
      return {
        radius: auToOrbitRadius(au),
        angle: rng(i + 500, 2) * Math.PI * 2,
        y: (rng(i + 500, 3) - 0.5) * 2.4,
        size: 0.025 + rng(i + 500, 4) * 0.04,
        orbitalPeriodDays: beltOrbitalPeriodDays(au),
      }
    })
  }, [])

  useLayoutEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    seeds.forEach((seed, i) => {
      mesh.setColorAt(i, new THREE.Color(seed.color))
    })
    mesh.instanceColor!.needsUpdate = true
  }, [seeds])

  useFrame(() => {
    const elapsed = getElapsedDays()
    const mesh = meshRef.current
    const dust = dustRef.current

    if (mesh) {
      seeds.forEach((seed, i) => {
        const angle = computeOrbitAngle(elapsed, seed.orbitalPeriodDays, seed.angle)
        dummy.position.set(
          seed.radius * Math.cos(angle),
          seed.y,
          seed.radius * Math.sin(angle),
        )
        dummy.rotation.set(
          seed.spin + computeRotation(elapsed, seed.spinRateDays),
          angle,
          computeRotation(elapsed, seed.spinRateDays * 1.4),
        )
        dummy.scale.setScalar(seed.size)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
    }

    if (dust) {
      dustSeeds.forEach((seed, i) => {
        const angle = computeOrbitAngle(elapsed, seed.orbitalPeriodDays, seed.angle)
        dummy.position.set(
          seed.radius * Math.cos(angle),
          seed.y,
          seed.radius * Math.sin(angle),
        )
        dummy.rotation.set(0, angle, 0)
        dummy.scale.setScalar(seed.size)
        dummy.updateMatrix()
        dust.setMatrixAt(i, dummy.matrix)
      })
      dust.instanceMatrix.needsUpdate = true
    }
  })

  const innerR = auToOrbitRadius(INNER_AU)
  const outerR = auToOrbitRadius(OUTER_AU)
  const midR = (innerR + outerR) / 2

  return (
    <group name="asteroid-belt">
      <mesh rotation={[Math.PI / 2, 0, 0]} renderOrder={0}>
        <ringGeometry args={[innerR * 0.98, outerR * 1.02, 128]} />
        <meshBasicMaterial
          color="#6a5a48"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, ASTEROID_COUNT]} frustumCulled={false}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          vertexColors
          roughness={0.88}
          metalness={0.12}
          emissive="#1a1510"
          emissiveIntensity={0.06}
        />
      </instancedMesh>

      <instancedMesh ref={dustRef} args={[undefined, undefined, 120]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial
          color="#c4b098"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[midR, (outerR - innerR) * 0.45, 8, 96]} />
        <meshBasicMaterial
          color="#8a7a60"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
