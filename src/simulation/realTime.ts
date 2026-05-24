/** Epoca J2000.0 — referencia astronomica estandar. */
export const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0)

/**
 * Longitud media aproximada (rad) en J2000.0 por planeta.
 * Fuentes: elementos orbitales medios simplificados (NASA/JPL).
 */
export const MEAN_LONGITUDE_J2000: Record<string, number> = {
  mercury: 4.485,
  venus: 3.096,
  earth: 6.240,
  mars: 6.203,
  jupiter: 0.599,
  saturn: 0.874,
  uranus: 5.311,
  neptune: 5.311,
}

/** Dias terrestres desde J2000.0 hasta la fecha dada. */
export function getDaysSinceJ2000(date = new Date()): number {
  return (date.getTime() - J2000_MS) / 86_400_000
}

export function dateFromSimDays(daysSinceJ2000: number): Date {
  return new Date(J2000_MS + daysSinceJ2000 * 86_400_000)
}

/** Fase orbital inicial segun modo de tiempo. */
export function getPlanetPhaseOffset(
  planetId: string,
  timeMode: 'simulated' | 'realTime',
  simulatedOffset: number,
): number {
  if (timeMode === 'realTime') {
    return MEAN_LONGITUDE_J2000[planetId] ?? 0
  }
  return simulatedOffset
}

export function formatRealWorldDate(date = new Date()): string {
  return date.toLocaleString('es', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatSimDaysAsDate(daysSinceJ2000: number): string {
  return formatRealWorldDate(dateFromSimDays(daysSinceJ2000))
}
