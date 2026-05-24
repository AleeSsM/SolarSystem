import { useEffect, useState } from 'react'
import { getElapsedDays } from '../hooks/useSimulationClock'

export function formatSimulatedTime(days: number): string {
  const years = days / 365.25
  if (years >= 1) {
    return `${years.toFixed(2)} anos terrestres`
  }
  if (days >= 1) {
    return `${days.toFixed(1)} dias simulados`
  }
  const hours = days * 24
  if (hours >= 1) {
    return `${hours.toFixed(1)} h simuladas`
  }
  const minutes = hours * 60
  return `${Math.max(1, Math.round(minutes))} min simulados`
}

/** Muestra el tiempo simulado actualizado en tiempo real (lee el ref del reloj 3D). */
export function useSimulatedTime(): number {
  const [days, setDays] = useState(0)

  useEffect(() => {
    let frameId = 0

    const tick = () => {
      setDays(getElapsedDays())
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return days
}
