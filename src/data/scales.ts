/**
 * Escala visual de distancias (UA → unidades de escena).
 * Compresion potencial: la escala real dejaria a Neptuno fuera de vista util.
 * Tierra = 22 unidades (referencia).
 */
export function auToOrbitRadius(au: number): number {
  const base = 12
  const factor = 10
  return base + Math.pow(au, 0.65) * factor
}

/**
 * Escala visual de radios planetarios (relativo a la Tierra = 0.55).
 * Exagerado respecto a distancia para que sean visibles desde lejos.
 */
export function earthRelativeToRadius(relativeToEarth: number): number {
  return relativeToEarth * 0.55
}

/** UA reales por planeta (NASA). */
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

/** Radio relativo a la Tierra (1 = Tierra). */
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

/** Desfase inicial en radianes para que no arranquen alineados. */
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

/** Color de linea de orbita por planeta. */
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
