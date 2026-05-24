import * as THREE from 'three'
import { NEPTUNE } from '../data/planets'

const MAX_ORBIT = NEPTUNE.orbitRadius

export const SYSTEM_OVERVIEW = {
  position: new THREE.Vector3(0, MAX_ORBIT * 0.55, MAX_ORBIT * 0.85),
  target: new THREE.Vector3(0, 0, 0),
} as const

export const SUN_VIEW = {
  position: new THREE.Vector3(0, 4, 18),
  target: new THREE.Vector3(0, 0, 0),
} as const

export const CAMERA_LIMITS = {
  /** Vista libre del sistema completo */
  minDistance: 12,
  maxDistance: MAX_ORBIT * 2.8,
  maxPolarAngle: Math.PI / 1.75,
} as const

/** Distancia camara ↔ planeta al entrar en modo seguimiento. */
export function getFollowCameraDistance(planetRadius: number): number {
  return Math.max(planetRadius * 40, 28)
}

/** Posicion de camara relativa al planeta (atras y ligeramente arriba). */
export function getFollowCameraOffset(planetRadius: number): THREE.Vector3 {
  const dist = getFollowCameraDistance(planetRadius)
  const direction = new THREE.Vector3(0.35, 0.28, 1).normalize()
  return direction.multiplyScalar(dist)
}

/** Limites de zoom cuando se sigue un planeta concreto. */
export function getFollowZoomLimits(planetRadius: number) {
  const base = getFollowCameraDistance(planetRadius)
  return {
    minDistance: Math.max(planetRadius * 1.6, 1.2),
    maxDistance: Math.max(base * 10, planetRadius * 150, 90),
  }
}

export function smoothDampFactor(delta: number, speed = 5): number {
  return 1 - Math.exp(-speed * delta)
}

export const TRANSITION_THRESHOLD = 0.5
