import type { PlanetData } from '../data/planets'
import { getPlanetById } from '../data/planets'
import { getPlanetOrbitRadiusById } from '../data/scales'
import { getElapsedDays } from '../hooks/useSimulationClock'
import { computeBodyState, type Vec3 } from '../simulation/orbit'
import { getPlanetPhaseOffset } from '../simulation/realTime'
import { useAppStore } from '../store/useAppStore'

export function getPlanetPosition(planet: PlanetData): Vec3 {
  const timeMode = useAppStore.getState().timeMode
  const elapsed = getElapsedDays()
  const orbitRadius = getPlanetOrbitRadiusById(planet.id)
  const { position } = computeBodyState(
    elapsed,
    orbitRadius,
    planet.orbitalPeriodDays,
    planet.rotationPeriodDays,
    planet.inclinationDeg,
    getPlanetPhaseOffset(planet.id, timeMode, planet.orbitPhaseOffset),
    planet.ascendingNodeDeg,
  )
  return position
}

export function getPlanetPositionById(planetId: string): Vec3 | null {
  const planet = getPlanetById(planetId)
  if (!planet) return null
  return getPlanetPosition(planet)
}
