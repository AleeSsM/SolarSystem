import { DoubleSide } from 'three'

interface SaturnRingsProps {
  planetRadius: number
}

export function SaturnRings({ planetRadius }: SaturnRingsProps) {
  const inner = planetRadius * 1.35
  const outer = planetRadius * 2.15

  return (
    <group rotation={[Math.PI / 2.2, 0, 0]}>
      <mesh renderOrder={1}>
        <ringGeometry args={[inner, outer, 128]} />
        <meshStandardMaterial
          color="#c9b896"
          transparent
          opacity={0.78}
          side={DoubleSide}
          depthWrite={false}
          roughness={0.8}
          metalness={0.08}
          emissive="#1a1510"
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh renderOrder={2}>
        <ringGeometry args={[inner * 1.05, outer * 0.92, 128]} />
        <meshStandardMaterial
          color="#8a7355"
          transparent
          opacity={0.35}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
