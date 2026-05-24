import { Bloom, EffectComposer } from '@react-three/postprocessing'

export function PostEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.92}
        luminanceSmoothing={0.25}
        intensity={1.5}
        mipmapBlur
        radius={0.8}
      />
    </EffectComposer>
  )
}
