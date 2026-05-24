import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAppStore } from '../store/useAppStore'
import { SECONDS_PER_SIM_DAY } from '../simulation/constants'
import { getDaysSinceJ2000 } from '../simulation/realTime'

const elapsedDaysRef = { current: 0 }

/** Ancla de Tiempo Real: dias desde J2000 en el instante de sincronizacion. */
let realTimeAnchorDays = getDaysSinceJ2000()
let realTimeAnchorMs = Date.now()
let realTimeFrozenDays = realTimeAnchorDays

export function getElapsedDays(): number {
  return elapsedDaysRef.current
}

export function setElapsedDays(days: number): void {
  elapsedDaysRef.current = days
}

function computeRealTimeElapsed(timeScale: number): number {
  const elapsedMs = Date.now() - realTimeAnchorMs
  return realTimeAnchorDays + (elapsedMs / 86_400_000) * timeScale
}

/** Re-ancla sin saltar posiciones al cambiar el multiplicador en Tiempo Real. */
export function reanchorRealTimeClock(timeScale: number): void {
  realTimeAnchorDays = computeRealTimeElapsed(timeScale)
  realTimeAnchorMs = Date.now()
  realTimeFrozenDays = realTimeAnchorDays
}

/** Sincroniza el reloj con la fecha/hora actual del sistema. */
export function syncRealTimeAnchor(): void {
  realTimeAnchorDays = getDaysSinceJ2000()
  realTimeAnchorMs = Date.now()
  realTimeFrozenDays = realTimeAnchorDays
  elapsedDaysRef.current = realTimeAnchorDays
}

/** Congela Tiempo Real en el instante actual (pausa). */
export function freezeRealTimeAnchor(timeScale: number): void {
  realTimeFrozenDays = computeRealTimeElapsed(timeScale)
  elapsedDaysRef.current = realTimeFrozenDays
}

/** Reanuda Tiempo Real desde el instante congelado. */
export function resumeRealTimeAnchor(): void {
  realTimeAnchorDays = realTimeFrozenDays
  realTimeAnchorMs = Date.now()
}

/** Componente invisible que avanza el reloj simulado dentro del Canvas. */
export function SimulationClock() {
  const isPaused = useAppStore((s) => s.isPaused)
  const timeScale = useAppStore((s) => s.timeScale)
  const timeMode = useAppStore((s) => s.timeMode)
  const wasPausedRef = useRef(isPaused)

  useFrame((_, delta) => {
    if (timeMode === 'realTime') {
      if (isPaused) {
        elapsedDaysRef.current = realTimeFrozenDays
      } else {
        elapsedDaysRef.current = computeRealTimeElapsed(timeScale)
      }
      wasPausedRef.current = isPaused
      return
    }

    if (!isPaused) {
      elapsedDaysRef.current += (delta * timeScale) / SECONDS_PER_SIM_DAY
    }
    wasPausedRef.current = isPaused
  })

  return null
}

/** Hook para leer el tiempo simulado en componentes React (UI). */
export function useElapsedDaysDisplay() {
  const displayRef = useRef(0)

  useFrame(() => {
    displayRef.current = elapsedDaysRef.current
  })

  return displayRef
}
