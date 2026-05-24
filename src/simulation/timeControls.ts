export const TIME_SCALE_OPTIONS = [1, 100_000, 1_000_000, 10_000_000] as const
export type TimeScaleOption = (typeof TIME_SCALE_OPTIONS)[number]

export function formatTimeScaleLabel(scale: number): string {
  if (scale >= 1_000_000) {
    const millions = scale / 1_000_000
    return `x${millions}M`
  }
  if (scale >= 1000) {
    return `x${scale / 1000}k`
  }
  return 'x1'
}

export function formatTimeScaleTitle(scale: number, isRealTime: boolean): string {
  const label = formatTimeScaleLabel(scale)
  if (isRealTime) {
    return scale === 1
      ? 'Avance a velocidad real desde la fecha anclada'
      : `${label} sobre la fecha anclada`
  }
  return scale === 1
    ? 'Velocidad real (1 dia simulado = 1 dia real)'
    : `${label} la velocidad real`
}
