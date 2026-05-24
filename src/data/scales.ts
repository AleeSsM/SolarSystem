import { Vector3 } from 'three'

const DISTANCE = { base: 14, factor: 9.2, exponent: 0.8 } as const

/** Tierra en escena (ratios NASA lineales). */
export const EARTH_SCENE_RADIUS = 0.38

/** Mercurio mantiene distancia AU real; el boost rompía el orden (quedaba más lejos que Venus). */
export const MERCURY_ORBIT_BOOST = 1

/** Sol más compacto para no tapar las órbitas interiores. */
export const SUN_SIZE_BOOST = 1

export const PLANET_SIZE = {
  mercury: 0.383,
  venus: 0.949,
  earth: 1.0,
  mars: 0.532,
  jupiter: 11.21,
  saturn: 9.45,
  uranus: 4.01,
  neptune: 3.88,
} as const

export type PlanetId = keyof typeof PLANET_SIZE

export const MOON_TO_PARENT_RATIO = {
  moon: 0.2724,
  io: 0.2857,
} as const

export type MoonId = keyof typeof MOON_TO_PARENT_RATIO

export function auToOrbitRadius(au: number): number {
  return DISTANCE.base + Math.pow(au, DISTANCE.exponent) * DISTANCE.factor
}

export function getPlanetOrbitRadiusById(id: string): number {
  const au = PLANET_AU[id as PlanetId]
  if (au === undefined) return auToOrbitRadius(1)
  const radius = auToOrbitRadius(au)
  if (id === 'mercury') return radius * MERCURY_ORBIT_BOOST
  return radius
}

export function getMaxOrbitRadius(): number {
  return auToOrbitRadius(PLANET_AU.neptune)
}

export function planetSceneRadius(relativeToEarth: number): number {
  return EARTH_SCENE_RADIUS * relativeToEarth
}

export function getPlanetSceneRadiusById(id: string): number {
  const rel = PLANET_SIZE[id as PlanetId]
  if (rel === undefined) return EARTH_SCENE_RADIUS
  return planetSceneRadius(rel)
}

export function moonSceneRadius(moonId: string, parentPlanetId: string): number {
  const parentRel = PLANET_SIZE[parentPlanetId as PlanetId]
  if (parentRel === undefined) return 0.15
  const parentRadius = planetSceneRadius(parentRel)
  const ratio = MOON_TO_PARENT_RATIO[moonId as MoonId]
  if (ratio !== undefined) return parentRadius * ratio
  return moonId === 'moon' ? 0.15 : 0.22
}

export const PLANET_AU = {
  mercury: 0.387,
  venus: 0.723,
  earth: 1.0,
  mars: 1.524,
  jupiter: 5.204,
  saturn: 9.583,
  uranus: 19.201,
  neptune: 30.047,
} as const

export const ORBIT_PHASE_OFFSET: Record<string, number> = {
  mercury: 0,
  venus: Math.PI * 0.4,
  earth: Math.PI * 0.8,
  mars: Math.PI * 1.2,
  jupiter: Math.PI * 0.2,
  saturn: Math.PI * 1.6,
  uranus: Math.PI * 0.6,
  neptune: Math.PI * 1.0,
}

export const ORBIT_COLORS: Record<string, string> = {
  mercury: '#a0a0a0',
  venus: '#e8c07a',
  earth: '#5a7fd4',
  mars: '#c96a4a',
  jupiter: '#c9a86c',
  saturn: '#d4c4a0',
  uranus: '#7ec8d8',
  neptune: '#4a7fd4',
}

export const SUN_TO_EARTH_RADIUS = 109.1

export function getSunSceneRadius(): number {
  const earthR = EARTH_SCENE_RADIUS
  const jupiterR = earthR * PLANET_SIZE.jupiter
  const mercuryOrbit = getPlanetOrbitRadiusById('mercury')
  const idealSun = earthR * SUN_TO_EARTH_RADIUS
  const orbitCap = mercuryOrbit * 0.36
  const jupiterFloor = jupiterR * 1.14
  return Math.max(jupiterFloor, Math.min(idealSun, orbitCap)) * SUN_SIZE_BOOST
}

export function getSunView(sunRadius: number) {
  const distance = Math.max(sunRadius * 2.6, 16)
  return {
    position: new Vector3(0, sunRadius * 0.22, distance),
    target: new Vector3(0, 0, 0),
  }
}

const PLANET_ORDER = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
] as const

if (import.meta.env.DEV) {
  for (let i = 1; i < PLANET_ORDER.length; i++) {
    const prev = getPlanetOrbitRadiusById(PLANET_ORDER[i - 1])
    const next = getPlanetOrbitRadiusById(PLANET_ORDER[i])
    if (next <= prev) {
      console.error(
        `[scales] Orden orbital incorrecto: ${PLANET_ORDER[i]} (${next}) debe estar más lejos que ${PLANET_ORDER[i - 1]} (${prev})`,
      )
    }
  }
}
