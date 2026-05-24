import { PLANETS } from './planets'
import type { PlanetId } from './scales'

/** Longitud media aproximada (grados) para estimar elongación. */
const MEAN_LONGITUDE_2020 = {
  mercury: 252,
  venus: 181,
  earth: 100,
  mars: 355,
  jupiter: 240,
  saturn: 280,
  uranus: 10,
  neptune: 330,
} as const

const ORBITAL_PERIOD_YEARS = {
  mercury: 0.24,
  venus: 0.62,
  earth: 1,
  mars: 1.88,
  jupiter: 11.86,
  saturn: 29.45,
  uranus: 84.01,
  neptune: 164.8,
} as const

export type SkyVisibility = 'excelente' | 'visible' | 'baja' | 'sol'

export interface SkyTonightEntry {
  id: string
  name: string
  visibility: SkyVisibility
  note: string
}

function normalizeDeg(deg: number) {
  return ((deg % 360) + 360) % 360
}

function elongationDeg(planetLon: number, sunLon: number) {
  let diff = Math.abs(planetLon - sunLon)
  if (diff > 180) diff = 360 - diff
  return diff
}

function meanLongitude(planetId: PlanetId, date: Date) {
  const y = date.getFullYear() + (date.getMonth() + date.getDate() / 31) / 12 - 2020
  const base = MEAN_LONGITUDE_2020[planetId]
  const drift = (y / ORBITAL_PERIOD_YEARS[planetId]) * 360
  return normalizeDeg(base + drift)
}

/** Estimación educativa (no sustituye efemérides). */
export function getSkyTonight(date = new Date()): SkyTonightEntry[] {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86_400_000,
  )
  const sunLon = normalizeDeg((dayOfYear / 365.25) * 360)

  return PLANETS.map((planet) => {
    const id = planet.id as PlanetId
    const elong = elongationDeg(meanLongitude(id, date), sunLon)

    let visibility: SkyVisibility
    let note: string

    if (elong < 12) {
      visibility = 'sol'
      note = 'Muy cerca del Sol en el cielo; difícil de ver.'
    } else if (elong < 25) {
      visibility = 'baja'
      note = 'Visible al amanecer o atardecer si el cielo está despejado.'
    } else if (elong < 60) {
      visibility = 'visible'
      note = 'Buena separación del Sol; conviene mirar al anochecer o antes del alba.'
    } else {
      visibility = 'excelente'
      note = 'Elongación favorable; entre los mejores objetos de la noche.'
    }

    if (id === 'venus' && elong > 20) {
      note = 'Venus suele ser el objeto más brillante tras la Luna.'
    }
    if (id === 'jupiter' && elong > 40) {
      note = 'Júpiter destaca como punto brillante durante gran parte de la noche.'
    }

    return { id, name: planet.name, visibility, note }
  })
}

export function visibilityLabel(v: SkyVisibility): string {
  switch (v) {
    case 'excelente':
      return 'Muy favorable'
    case 'visible':
      return 'Visible'
    case 'baja':
      return 'Horizonte'
    case 'sol':
      return 'Cerca del Sol'
  }
}
