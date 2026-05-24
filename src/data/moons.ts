export interface MoonData {
  id: string
  name: string
  parentPlanetId: string
  radius: number
  orbitRadius: number
  orbitalPeriodDays: number
  textureUrl: string
}

export const MOON: MoonData = {
  id: 'moon',
  name: 'Luna',
  parentPlanetId: 'earth',
  radius: 0.15,
  orbitRadius: 1.2,
  orbitalPeriodDays: 27.32,
  textureUrl: '/textures/moon.jpg',
}

export const IO: MoonData = {
  id: 'io',
  name: 'Io',
  parentPlanetId: 'jupiter',
  radius: 0.22,
  orbitRadius: 2.2,
  orbitalPeriodDays: 1.77,
  textureUrl: '/textures/mercury.png',
}

export const MOONS: MoonData[] = [MOON, IO]

export function getMoonById(id: string): MoonData | undefined {
  return MOONS.find((moon) => moon.id === id)
}
