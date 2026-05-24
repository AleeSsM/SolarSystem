import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraRig } from '../camera/CameraRig'
import { SYSTEM_OVERVIEW } from '../camera/constants'
import { useAppStore } from '../store/useAppStore'
import { SolarScene } from './SolarScene'

export function Viewport3D() {
  return (
    <Canvas
      camera={{
        position: [
          SYSTEM_OVERVIEW.position.x,
          SYSTEM_OVERVIEW.position.y,
          SYSTEM_OVERVIEW.position.z,
        ],
        fov: 55,
        near: 0.1,
        far: 2000,
      }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      onPointerMissed={() => {
        useAppStore.getState().selectPlanet(null)
      }}
    >
      <Suspense fallback={null}>
        <SolarScene />
      </Suspense>
      <CameraRig />
    </Canvas>
  )
}
