import { PLANETS } from './planets'
import { PLANET_AU, getPlanetOrbitRadiusById, type PlanetId } from './scales'

const AU_TO_KM = 149.597_870_7

export interface PlanetScaleRow {
  id: string
  name: string
  au: number
  realDistanceKm: number
  sceneOrbitUnits: number
  compressionFactor: number
}

export function formatDistanceKm(km: number): string {
  if (km >= 1e9) return `${(km / 1e9).toFixed(2)} mil millones km`
  if (km >= 1e6) return `${(km / 1e6).toFixed(0)} millones km`
  return `${km.toLocaleString('es-MX', { maximumFractionDigits: 0 })} km`
}

export function getPlanetScaleRows(): PlanetScaleRow[] {
  return PLANETS.map((planet) => {
    const au = PLANET_AU[planet.id as PlanetId]
    const realDistanceKm = au * AU_TO_KM
    const sceneOrbitUnits = getPlanetOrbitRadiusById(planet.id)
    const linearScene = au * 23.2
    const compressionFactor = linearScene > 0 ? sceneOrbitUnits / linearScene : 1
    return {
      id: planet.id,
      name: planet.name,
      au,
      realDistanceKm,
      sceneOrbitUnits,
      compressionFactor,
    }
  })
}
