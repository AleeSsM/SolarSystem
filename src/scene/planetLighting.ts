/** Superficies planetarias: la luz del Sol viene del PointLight; el relleno solo afecta la zona en sombra. */
export const PLANET_SURFACE = {
  roughness: 0.86,
  metalness: 0.04,
} as const

export const MOON_SURFACE = {
  roughness: 0.9,
  metalness: 0.02,
} as const

/** Intensidad maxima del relleno nocturno (solo cara oscura) al 100 %. */
export const PLANET_FILL_MAX = 1.35

/** Convierte valor de barra 0–100 a intensidad de relleno en zona nocturna. */
export function getPlanetFillIntensity(fillPercent: number): number {
  const t = fillPercent / 100
  return t * t * PLANET_FILL_MAX
}

export type PlanetSurfaceParams = {
  roughness: number
  metalness: number
}
