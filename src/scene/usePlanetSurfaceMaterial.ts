import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  PLANET_SURFACE,
  getPlanetFillIntensity,
  type PlanetSurfaceParams,
} from './planetLighting'

const SUN_POSITION = new THREE.Vector3(0, 0, 0)
const SHADER_KEY = 'planet-night-fill-v4'

export function createPlanetSurfaceMaterial(
  texture: THREE.Texture,
  surface: PlanetSurfaceParams = PLANET_SURFACE,
): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: surface.roughness,
    metalness: surface.metalness,
  })

  material.customProgramCacheKey = () => SHADER_KEY

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uNightFill = { value: 0 }
    shader.uniforms.uSunPosition = { value: SUN_POSITION.clone() }

    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;`,
    )

    shader.vertexShader = shader.vertexShader.replace(
      '#include <beginnormal_vertex>',
      `#include <beginnormal_vertex>
      vWorldNormal = normalize((modelMatrix * vec4(objectNormal, 0.0)).xyz);`,
    )

    shader.vertexShader = shader.vertexShader.replace(
      '#include <worldpos_vertex>',
      `#include <worldpos_vertex>
      vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      uniform float uNightFill;
      uniform vec3 uSunPosition;`,
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <opaque_fragment>',
      `{
        vec3 sunDir = normalize(uSunPosition - vWorldPosition);
        float ndotl = clamp(dot(normalize(vWorldNormal), sunDir), 0.0, 1.0);
        float night = 1.0 - ndotl;
        outgoingLight += diffuseColor.rgb * uNightFill * night;
      }
      #include <opaque_fragment>`,
    )

    material.userData.nightFillUniform = shader.uniforms.uNightFill
  }

  return material
}

export function usePlanetSurfaceMaterial(
  texture: THREE.Texture,
  fillPercent: number,
  surface: PlanetSurfaceParams = PLANET_SURFACE,
) {
  const material = useMemo(
    () => createPlanetSurfaceMaterial(texture, surface),
    [texture, surface.roughness, surface.metalness],
  )

  const fillRef = useRef(getPlanetFillIntensity(fillPercent))
  fillRef.current = getPlanetFillIntensity(fillPercent)

  useFrame(() => {
    const uniform = material.userData.nightFillUniform as { value: number } | undefined
    if (uniform) {
      uniform.value = fillRef.current
    }
  })

  return material
}
