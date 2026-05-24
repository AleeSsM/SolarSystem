export const TIME_SCALE_OPTIONS = [
  1,
  10_000,
  1_000_000,
  10_000_000,
  100_000_000,
  1_000_000_000,
] as const
export type TimeScaleOption = (typeof TIME_SCALE_OPTIONS)[number]

export function formatTimeScaleLabel(scale: number): string {
  if (scale >= 1_000_000) {
    const millions = scale / 1_000_000
    return `x${millions}M`
  }
  if (scale >= 1_000) {
    const thousands = scale / 1_000
    return Number.isInteger(thousands) ? `x${thousands}k` : `x${thousands.toFixed(1)}k`
  }
  return `x${scale}`
}

export function formatTimeScaleTitle(scale: number, isRealTime: boolean): string {
  const label = formatTimeScaleLabel(scale)
  if (isRealTime) {
    return `${label} sobre la fecha anclada`
  }
  return `${label} la velocidad real`
}
