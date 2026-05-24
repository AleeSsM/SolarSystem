import {
  ORBIT_COLORS,
  ORBIT_PHASE_OFFSET,
  PLANET_AU,
  getPlanetOrbitRadiusById,
  getPlanetSceneRadiusById,
  getSunSceneRadius,
} from './scales'
import { texturePath } from '../constants/assets'

export interface PlanetData {
  id: string
  name: string
  radius: number
  orbitRadius: number
  orbitalPeriodDays: number
  rotationPeriodDays: number
  inclinationDeg: number
  orbitPhaseOffset: number
  orbitColor: string
  textureUrl: string
  sizeRelative: string
  distanceFromSun: string
  temperature: string
  funFact: string
}

export const SUN = {
  id: 'sun',
  name: 'Sol',
  /** Radio en escena; usar getSunSceneRadius() para el mesh 3D. */
  radius: getSunSceneRadius(),
  color: '#ffcc33',
  emissive: '#ff9900',
  emissiveIntensity: 6,
  lightIntensity: 1600,
  lightColor: '#fff4e0',
  lightDecay: 2,
  textureUrl: texturePath('sun.jpg'),
} as const

const p = (
  id: keyof typeof PLANET_AU,
  name: string,
  orbitalPeriodDays: number,
  rotationPeriodDays: number,
  inclinationDeg: number,
  textureUrl: string,
  sizeRelative: string,
  distanceFromSun: string,
  temperature: string,
  funFact: string,
): PlanetData => ({
  id,
  name,
  radius: getPlanetSceneRadiusById(id),
  orbitRadius: getPlanetOrbitRadiusById(id),
  orbitalPeriodDays,
  rotationPeriodDays: Math.abs(rotationPeriodDays),
  inclinationDeg,
  orbitPhaseOffset: ORBIT_PHASE_OFFSET[id],
  orbitColor: ORBIT_COLORS[id],
  textureUrl,
  sizeRelative,
  distanceFromSun,
  temperature,
  funFact,
})

export const MERCURY = p(
  'mercury',
  'Mercurio',
  87.97,
  58.6,
  7.0,
  texturePath('mercury.png'),
  '0.38× Tierra',
  '57.9 millones km (0.39 UA)',
  '167 °C dia / -183 °C noche',
  'Es el planeta mas cercano al Sol y el que orbita mas rapido.',
)

export const VENUS = p(
  'venus',
  'Venus',
  224.7,
  243,
  3.4,
  texturePath('venus.png'),
  '0.95× Tierra',
  '108.2 millones km (0.72 UA)',
  '464 °C promedio',
  'Tiene un efecto invernadero extremo; rota en sentido contrario.',
)

export const EARTH = p(
  'earth',
  'Tierra',
  365.25,
  1,
  0,
  texturePath('earth.jpg'),
  '1× (referencia)',
  '149.6 millones km (1 UA)',
  '15 °C promedio superficial',
  'Unico planeta conocido con vida y agua liquida estable en su superficie.',
)

export const MARS = p(
  'mars',
  'Marte',
  686.98,
  1.03,
  1.9,
  texturePath('mars.png'),
  '0.53× Tierra',
  '227.9 millones km (1.52 UA)',
  '-65 °C promedio',
  'Alberga el volcan mas grande del sistema solar: Olympus Mons.',
)

export const JUPITER = p(
  'jupiter',
  'Jupiter',
  4332.82,
  0.41,
  1.3,
  texturePath('jupiter.png'),
  '11.2× Tierra',
  '778.5 millones km (5.2 UA)',
  '-110 °C en la troposfera',
  'Su Mancha Roja es una tormenta que lleva siglos activa.',
)

export const SATURN = p(
  'saturn',
  'Saturno',
  10759.22,
  0.45,
  2.5,
  texturePath('saturn.png'),
  '9.5× Tierra',
  '1,434 millones km (9.5 UA)',
  '-140 °C promedio',
  'Su densidad es tan baja que flotaria en un oceano gigante.',
)

export const URANUS = p(
  'uranus',
  'Urano',
  30688.5,
  0.72,
  0.8,
  texturePath('uranus.png'),
  '4× Tierra',
  '2,871 millones km (19.2 UA)',
  '-195 °C promedio',
  'Gira de lado: su eje de rotacion esta casi paralelo al plano orbital.',
)

export const NEPTUNE = p(
  'neptune',
  'Neptuno',
  60189,
  0.67,
  1.8,
  texturePath('neptune.png'),
  '3.9× Tierra',
  '4,495 millones km (30.1 UA)',
  '-200 °C promedio',
  'Fue el primer planeta descubierto mediante calculos matematicos.',
)

/** Los 8 planetas en orden de distancia al Sol. */
export const PLANETS: PlanetData[] = [
  MERCURY,
  VENUS,
  EARTH,
  MARS,
  JUPITER,
  SATURN,
  URANUS,
  NEPTUNE,
]

export function getPlanetById(id: string): PlanetData | undefined {
  return PLANETS.find((planet) => planet.id === id)
}
