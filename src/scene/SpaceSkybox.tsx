import { useTexture } from '@react-three/drei'
import { BackSide } from 'three'

const SKY_RADIUS = 480

export function SpaceSkybox() {
  const texture = useTexture('/textures/skybox.jpg')

  return (
    <mesh renderOrder={-2} frustumCulled={false}>
      <sphereGeometry args={[SKY_RADIUS, 48, 48]} />
      <meshBasicMaterial map={texture} side={BackSide} depthWrite={false} fog={false} />
    </mesh>
  )
}
