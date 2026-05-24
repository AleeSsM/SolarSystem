import { useAppStore } from '../store/useAppStore'

export const SUN_ROTATION_PERIOD_DAYS = 25.38

/** Descenso virtual por envejecimiento de muestras (unidades / dia simulado). */
export const HELICAL_TRAIL_Y_UNITS_PER_DAY = 0.42

export function isHelicalMotionActive(): boolean {
  return useAppStore.getState().helicalMotion
}

/** Dias simulados desde que se activo el modo helicoidal. */
export function getHelicalMotionOriginDays(): number {
  return useAppStore.getState().helicalMotionStartDays
}

/** Cuanto desciende la estela respecto al cuerpo visible (crece con el tiempo). */
export function getHelicalTrailYOffset(elapsedDays: number): number {
  if (!isHelicalMotionActive()) return 0
  const origin = getHelicalMotionOriginDays()
  return (elapsedDays - origin) * HELICAL_TRAIL_Y_UNITS_PER_DAY
}
