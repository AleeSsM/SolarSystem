import { useTexture } from '@react-three/drei'
import { BackSide } from 'three'
import { texturePath } from '../constants/assets'

const SKY_RADIUS = 480

export function SpaceSkybox() {
  const texture = useTexture(texturePath('skybox.jpg'))

  return (
    <mesh renderOrder={-2} frustumCulled={false}>
      <sphereGeometry args={[SKY_RADIUS, 48, 48]} />
      <meshBasicMaterial map={texture} side={BackSide} depthWrite={false} fog={false} />
    </mesh>
  )
}
