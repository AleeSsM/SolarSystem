import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { AdditiveBlending, type Group, type Mesh } from 'three'
import { SUN } from '../data/planets'
import { getSunSceneRadius, SUN_SIZE_BOOST } from '../data/scales'
import { getElapsedDays } from '../hooks/useSimulationClock'
import { computeRotation } from '../simulation/orbit'
import { SUN_ROTATION_PERIOD_DAYS } from '../simulation/systemMotion'
import { useAppStore } from '../store/useAppStore'
import { HelicalTrail, SUN_TRAIL } from './HelicalTrail'

const SUN_TRAIL_BASE = getSunSceneRadius() / SUN_SIZE_BOOST

/** Corona siempre visible alrededor del Sol (independiente del modo helicoidal). */
function SunCorona({ radius }: { radius: number }) {
  const innerRef = useRef<Mesh>(null)
  const outerRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.elapsedTime * 0.85) * 0.04
    if (innerRef.current) innerRef.current.scale.setScalar(1.28 * pulse)
    if (outerRef.current) outerRef.current.scale.setScalar(1.62 * pulse)
  })

  return (
    <group name="sun-corona">
      <mesh ref={innerRef}>
        <sphereGeometry args={[radius, 40, 40]} />
        <meshBasicMaterial
          color="#ffcc55"
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={outerRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#ff9933"
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export function Sun() {
  const anchorRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)
  const texture = useTexture(SUN.textureUrl)
  const helicalOrigin = useAppStore((s) => s.helicalMotionStartDays)
  const radius = getSunSceneRadius()
  const trailWidth = SUN_TRAIL.width * (radius / SUN_TRAIL_BASE)

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
      <SunCorona radius={radius} />
      <HelicalTrail
        color={SUN_TRAIL.color}
        width={trailWidth}
        maxPoints={SUN_TRAIL.maxPoints}
        minSampleDist={SUN_TRAIL.minSampleDist}
        minDaysDelta={SUN_TRAIL.minDaysDelta}
        sourceRef={anchorRef}
        trailKey={helicalOrigin}
      >
        <group ref={anchorRef}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[radius, 64, 64]} />
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
          <mesh ref={glowRef} scale={1.1}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshBasicMaterial
              color="#ffaa44"
              transparent
              opacity={0.22}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      </HelicalTrail>
    </group>
  )
}
