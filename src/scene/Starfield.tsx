import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 4500
const PARALLAX_COUNT = 2500

function createStarGeometry(count: number, minRadius: number, maxRadius: number) {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const radius = minRadius + Math.random() * (maxRadius - minRadius)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return geo
}

export function Starfield() {
  const nearRef = useRef<THREE.Points>(null)
  const farRef = useRef<THREE.Points>(null)

  const nearGeometry = useMemo(() => createStarGeometry(STAR_COUNT, 140, 280), [])
  const farGeometry = useMemo(() => createStarGeometry(PARALLAX_COUNT, 300, 420), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (nearRef.current) nearRef.current.rotation.y = t * 0.0018
    if (farRef.current) farRef.current.rotation.y = t * 0.0006
  })

  return (
  <>
      <points ref={nearRef} geometry={nearGeometry} renderOrder={-1}>
        <pointsMaterial
          size={0.2}
          color="#e8eeff"
          transparent
          opacity={0.62}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <points ref={farRef} geometry={farGeometry} renderOrder={-1}>
        <pointsMaterial
          size={0.32}
          color="#9aa8d8"
          transparent
          opacity={0.38}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  )
}
