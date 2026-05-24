import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { AdditiveBlending, Vector2, Vector3, type Object3D } from 'three'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import type { RefObject } from 'react'
import { getElapsedDays } from '../hooks/useSimulationClock'
import { useAppStore } from '../store/useAppStore'
import {
  buildHelicalAuraPoints,
  pushHelicalAuraSample,
  type HelicalAuraSample,
} from './helicalAuraBuffer'

interface HelicalTrailProps {
  color: string
  width: number
  maxPoints: number
  minSampleDist: number
  /** Intervalo mínimo entre muestras por tiempo (días simulados). */
  minDaysDelta?: number
  sourceRef: RefObject<Object3D | null>
  trailKey: string | number
  children: React.ReactNode
}

const auraAttenuation = (t: number) => Math.max(0.34, t * t * t)

/** Estela anclada al cuerpo: la cola envejece hacia abajo sin alejarse del planeta. */
function HelicalAura({
  color,
  width,
  maxPoints,
  minSampleDist,
  minDaysDelta = 0.06,
  sourceRef,
  trailKey,
}: Omit<HelicalTrailProps, 'children'>) {
  const helicalMotion = useAppStore((s) => s.helicalMotion)
  const scene = useThree((s) => s.scene)
  const size = useThree((s) => s.size)
  const samplesRef = useRef<HelicalAuraSample[]>([])
  const worldPos = useRef(new Vector3())
  const geometry = useMemo(() => new MeshLineGeometry(), [])
  const material = useMemo(() => {
    const mat = new MeshLineMaterial({
      lineWidth: 0.24 * width,
      color,
      sizeAttenuation: 1,
      resolution: new Vector2(size.width, size.height),
    })
    mat.transparent = true
    mat.opacity = 1
    mat.depthWrite = false
    mat.blending = AdditiveBlending
    mat.toneMapped = false
    return mat
  }, [color, width, size.width, size.height])

  useEffect(() => {
    samplesRef.current = []
  }, [trailKey, helicalMotion])

  useEffect(() => {
    material.uniforms.resolution.value.set(size.width, size.height)
  }, [material, size.width, size.height])

  useFrame(() => {
    if (!helicalMotion || !sourceRef.current) return

    sourceRef.current.getWorldPosition(worldPos.current)
    const elapsed = getElapsedDays()
    pushHelicalAuraSample(
      samplesRef.current,
      maxPoints,
      {
        x: worldPos.current.x,
        y: worldPos.current.y,
        z: worldPos.current.z,
        days: elapsed,
      },
      minSampleDist,
      minDaysDelta,
    )

    const points = buildHelicalAuraPoints(samplesRef.current, elapsed)
    if (points.length >= 3) {
      geometry.setPoints(points, auraAttenuation)
    }
  })

  if (!helicalMotion) return null

  return createPortal(
    <mesh geometry={geometry} material={material} frustumCulled={false} renderOrder={12} />,
    scene,
  )
}

export function HelicalTrail({
  color,
  width,
  maxPoints,
  minSampleDist,
  minDaysDelta,
  sourceRef,
  trailKey,
  children,
}: HelicalTrailProps) {
  return (
    <>
      <HelicalAura
        key={trailKey}
        color={color}
        width={width}
        maxPoints={maxPoints}
        minSampleDist={minSampleDist}
        minDaysDelta={minDaysDelta}
        sourceRef={sourceRef}
        trailKey={trailKey}
      />
      {children}
    </>
  )
}

export function getPlanetTrailSettings(radius: number, orbitRadius: number) {
  return {
    width: Math.max(2.2, radius * 1.05),
    maxPoints: Math.round(100 + orbitRadius * 4.5),
    minSampleDist: Math.max(0.05, orbitRadius * 0.01),
  }
}

export const SUN_TRAIL = {
  width: 10,
  maxPoints: 420,
  minSampleDist: 0.02,
  minDaysDelta: 0.035,
  color: '#fff0a8',
} as const
