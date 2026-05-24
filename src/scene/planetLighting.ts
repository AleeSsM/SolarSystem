/** Superficies planetarias: la luz del Sol viene del PointLight; el relleno usa emissiveMap. */
export const PLANET_SURFACE = {
  roughness: 0.86,
  metalness: 0.04,
} as const

export const MOON_SURFACE = {
  roughness: 0.9,
  metalness: 0.02,
} as const

/** Intensidad maxima del relleno (emissiveMap) cuando la barra esta al 100 %. */
export const PLANET_FILL_MAX = 2.2

/** Convierte valor de barra 0–100 a intensidad emisiva de relleno sobre la textura. */
export function getPlanetFillIntensity(fillPercent: number): number {
  const t = fillPercent / 100
  return t * t * PLANET_FILL_MAX
}
