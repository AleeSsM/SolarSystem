/** Detecta dispositivos donde conviene reducir carga gráfica. */
export function detectPerformanceMode(): boolean {
  if (typeof window === 'undefined') return false
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.innerWidth < 900
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const lowMem = mem !== undefined && mem < 4
  return coarse || narrow || lowMem
}

export const ASTEROID_COUNT_DEFAULT = 520
export const ASTEROID_COUNT_PERFORMANCE = 100
export const DUST_COUNT_DEFAULT = 120
export const DUST_COUNT_PERFORMANCE = 24
