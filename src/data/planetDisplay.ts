import { getPlanetOrbitRadiusById, getPlanetSceneRadiusById } from './scales'

export function getPlanetDisplayRadius(planetId: string): number {
  return getPlanetSceneRadiusById(planetId)
}

export function getPlanetDisplayOrbitRadius(planetId: string): number {
  return getPlanetOrbitRadiusById(planetId)
}
