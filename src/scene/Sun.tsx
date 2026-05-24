import { useTexture } from '@react-three/drei'
import { SUN } from '../data/planets'

export function Sun() {
  const texture = useTexture(SUN.textureUrl)

  return (
    <group name="sun">
      <pointLight
        intensity={SUN.lightIntensity}
        color={SUN.lightColor}
        decay={SUN.lightDecay}
        distance={0}
      />
      <mesh>
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
      <mesh scale={1.12}>
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
  )
}
