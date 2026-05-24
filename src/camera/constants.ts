import * as THREE from 'three'
import { NEPTUNE } from '../data/planets'

const MAX_ORBIT = NEPTUNE.orbitRadius

/** Vista general del sistema (cenital). */
export const SYSTEM_OVERVIEW = {
  position: new THREE.Vector3(0, MAX_ORBIT * 1.45, 0.001),
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

/** Distancia camara ↔ planeta segun barra de zoom (0 = lejos, 100 = cerca). */
export function getFollowDistanceFromZoom(planetRadius: number, zoomPercent: number): number {
  const { minDistance, maxDistance } = getFollowZoomLimits(planetRadius)
  const t = Math.min(100, Math.max(0, zoomPercent)) / 100
  return minDistance + (1 - t) * (maxDistance - minDistance)
}

/** Inverso: distancia actual → valor de la barra de zoom. */
export function getFollowZoomFromDistance(planetRadius: number, distance: number): number {
  const { minDistance, maxDistance } = getFollowZoomLimits(planetRadius)
  const span = maxDistance - minDistance
  if (span <= 0) return 42
  const t = 1 - (distance - minDistance) / span
  return Math.round(Math.min(100, Math.max(0, t * 100)))
}

export function smoothDampFactor(delta: number, speed = 5): number {
  return 1 - Math.exp(-speed * delta)
}

export const TRANSITION_THRESHOLD = 0.5
