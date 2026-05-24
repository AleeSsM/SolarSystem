import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraRig } from '../camera/CameraRig'
import { INTRO_START } from '../camera/introSequence'
import { useAppStore } from '../store/useAppStore'
import { LoadingReporter } from './LoadingReporter'
import { SolarScene } from './SolarScene'

export function Viewport3D() {
  const performanceMode = useAppStore((s) => s.performanceMode)

  return (
    <Canvas
      camera={{
        position: [INTRO_START.position.x, INTRO_START.position.y, INTRO_START.position.z],
        fov: 55,
        near: 0.1,
        far: performanceMode ? 1200 : 2000,
      }}
      gl={{ antialias: !performanceMode, alpha: false }}
      dpr={performanceMode ? 1 : [1, 2]}
      onPointerMissed={() => {
        if (useAppStore.getState().introActive) return
        useAppStore.getState().selectPlanet(null)
      }}
    >
      <Suspense fallback={null}>
        <LoadingReporter />
        <SolarScene />
      </Suspense>
      <CameraRig />
    </Canvas>
  )
}
