import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { getCircularOrbitPosition } from '../simulation/orbit'

interface OrbitPathProps {
  radius: number
  color?: string
  inclinationDeg?: number
  ascendingNodeDeg?: number
}

export function OrbitPath({
  radius,
  color = '#5a7fd4',
  inclinationDeg = 0,
  ascendingNodeDeg = 0,
}: OrbitPathProps) {
  const points = useMemo(() => {
    const segments = 128
    const pts: THREE.Vector3[] = []

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const [x, y, z] = getCircularOrbitPosition(radius, angle, inclinationDeg, ascendingNodeDeg)
      pts.push(new THREE.Vector3(x, y, z))
    }

    return pts
  }, [radius, inclinationDeg, ascendingNodeDeg])

  return (
    <Line points={points} color={color} lineWidth={1} transparent opacity={0.4} />
  )
}
