import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useAppStore } from '../store/useAppStore'

export function PostEffects() {
  const helicalMotion = useAppStore((s) => s.helicalMotion)
  const performanceMode = useAppStore((s) => s.performanceMode)

  if (performanceMode) return null

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={helicalMotion ? 0.48 : 0.92}
        luminanceSmoothing={0.2}
        intensity={helicalMotion ? 2.75 : 1.5}
        mipmapBlur
        radius={0.85}
      />
    </EffectComposer>
  )
}
