import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface OrbitPathProps {
  radius: number
  color?: string
  inclinationDeg?: number
}

export function OrbitPath({ radius, color = '#5a7fd4', inclinationDeg = 0 }: OrbitPathProps) {
  const points = useMemo(() => {
    const segments = 128
    const inc = (inclinationDeg * Math.PI) / 180
    const pts: THREE.Vector3[] = []

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = radius * Math.cos(angle)
      const z = radius * Math.sin(angle) * Math.cos(inc)
      const y = radius * Math.sin(angle) * Math.sin(inc)
      pts.push(new THREE.Vector3(x, y, z))
    }

    return pts
  }, [radius, inclinationDeg])

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.4}
    />
  )
}
