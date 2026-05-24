import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import { SUN } from '../data/planets'
import { getElapsedDays } from '../hooks/useSimulationClock'
import { computeRotation } from '../simulation/orbit'
import { SUN_ROTATION_PERIOD_DAYS } from '../simulation/systemMotion'
import { useAppStore } from '../store/useAppStore'
import { HelicalTrail, SUN_TRAIL } from './HelicalTrail'

export function Sun() {
  const anchorRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)
  const texture = useTexture(SUN.textureUrl)
  const helicalOrigin = useAppStore((s) => s.helicalMotionStartDays)

  useFrame(() => {
    const elapsed = getElapsedDays()
    const spin = computeRotation(elapsed, SUN_ROTATION_PERIOD_DAYS)
    if (meshRef.current) meshRef.current.rotation.y = spin
    if (glowRef.current) glowRef.current.rotation.y = spin
  })

  return (
    <group name="sun">
      <pointLight
        intensity={SUN.lightIntensity}
        color={SUN.lightColor}
        decay={SUN.lightDecay}
        distance={0}
      />
      <HelicalTrail
        color={SUN_TRAIL.color}
        width={SUN_TRAIL.width}
        maxPoints={SUN_TRAIL.maxPoints}
        minSampleDist={SUN_TRAIL.minSampleDist}
        sourceRef={anchorRef}
        trailKey={helicalOrigin}
      >
        <group ref={anchorRef}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[SUN.radius, 64, 64]} />
            <meshStandardMaterial
              map={texture}
              emissive={SUN.emissive}
              emissiveMap={texture}
              emissiveIntensity={SUN.emissiveIntensity}
              color={SUN.color}
              roughness={0.35}
              toneMapped={false}
            />
          </mesh>
          <mesh ref={glowRef} scale={1.12}>
            <sphereGeometry args={[SUN.radius, 32, 32]} />
            <meshBasicMaterial
              color="#ffaa44"
              transparent
              opacity={0.18}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      </HelicalTrail>
    </group>
  )
}
