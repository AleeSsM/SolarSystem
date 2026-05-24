export type TeacherCameraTarget =
  | { type: 'overview' }
  | { type: 'sun' }
  | { type: 'planet'; planetId: string }

export interface TeacherStep {
  id: string
  title: string
  paragraphs: string[]
  camera: TeacherCameraTarget
  showOrbits: boolean
  showLabels: boolean
}

export const TEACHER_STEPS: TeacherStep[] = [
  {
    id: 'welcome',
    title: 'Bienvenida',
    paragraphs: [
      'Ocho planetas orbitando al Sol, con periodos reales pero distancias y tamanos reescalados para que quepan en pantalla.',
      'Empezamos con una vista general. Fijate como todo cabe: en la vida real Neptuno estaria muchisimo mas lejos.',
    ],
    camera: { type: 'overview' },
    showOrbits: false,
    showLabels: false,
  },
  {
    id: 'sun',
    title: 'El Sol — centro del sistema',
    paragraphs: [
      'El Sol es una estrella de hidrogeno y helio que concentra casi toda la masa del sistema. Su gravedad mantiene a los planetas en orbita.',
      'La luz y el calor que emiten permiten la vida en la Tierra y definen las condiciones de cada mundo.',
    ],
    camera: { type: 'sun' },
    showOrbits: false,
    showLabels: false,
  },
  {
    id: 'orbits',
    title: 'Las orbitas planetarias',
    paragraphs: [
      'Cada planeta sigue una trayectoria cerrada alrededor del Sol. Aqui son circulos simplificados con inclinacion leve.',
      'Los periodos orbitales son reales: Mercurio tarda unos 88 dias terrestres; Neptuno mas de 60 000. Fijate en las lineas de color de cada orbita.',
    ],
    camera: { type: 'overview' },
    showOrbits: true,
    showLabels: false,
  },
  {
    id: 'mercury',
    title: 'Mercurio',
    paragraphs: [
      'El planeta mas cercano al Sol y el mas pequeno. Su ano dura solo 88 dias terrestres.',
      'Las temperaturas extremas van de -183 °C de noche a 167 °C de dia por la falta de atmosfera.',
    ],
    camera: { type: 'planet', planetId: 'mercury' },
    showOrbits: true,
    showLabels: true,
  },
  {
    id: 'venus',
    title: 'Venus',
    paragraphs: [
      'Similar en tamano a la Tierra, pero con un efecto invernadero extremo: unos 464 °C de media.',
      'Rota en sentido contrario al de la mayoria de planetas (rotacion retrograda).',
    ],
    camera: { type: 'planet', planetId: 'venus' },
    showOrbits: true,
    showLabels: true,
  },
  {
    id: 'earth',
    title: 'Tierra',
    paragraphs: [
      'Nuestro hogar: un ano de 365 dias y rotacion de 24 horas. Distancia de referencia: 1 UA (149.6 millones km).',
      'Unico planeta conocido con vida y agua liquida estable en superficie.',
    ],
    camera: { type: 'planet', planetId: 'earth' },
    showOrbits: true,
    showLabels: true,
  },
  {
    id: 'mars',
    title: 'Marte',
    paragraphs: [
      'El planeta rojo, objetivo principal de futuras misiones crewed. Un ano marciano dura casi 687 dias terrestres.',
      'Alberga el volcan mas grande del sistema: Olympus Mons.',
    ],
    camera: { type: 'planet', planetId: 'mars' },
    showOrbits: true,
    showLabels: true,
  },
  {
    id: 'jupiter',
    title: 'Júpiter',
    paragraphs: [
      'El gigante gaseoso: mas masivo que todos los demas planetas juntos. Su Mancha Roja es una tormenta centenaria.',
      'Actua como "escudo" gravitatorio, desviando muchos asteroides del sistema interior.',
    ],
    camera: { type: 'planet', planetId: 'jupiter' },
    showOrbits: true,
    showLabels: true,
  },
  {
    id: 'saturn',
    title: 'Saturno',
    paragraphs: [
      'Famoso por sus anillos de hielo y roca. Es menos denso que el agua: flotaria en un oceano gigante.',
      'Observa los anillos en el modelo 3D: son una capa semitransparente alrededor del ecuador del planeta.',
    ],
    camera: { type: 'planet', planetId: 'saturn' },
    showOrbits: true,
    showLabels: true,
  },
  {
    id: 'uranus',
    title: 'Urano',
    paragraphs: [
      'Gigante de hielo que gira de lado: su eje de rotacion esta casi paralelo al plano orbital.',
      'Fue el primer planeta descubierto con telescopio, en 1781.',
    ],
    camera: { type: 'planet', planetId: 'uranus' },
    showOrbits: true,
    showLabels: true,
  },
  {
    id: 'neptune',
    title: 'Neptuno',
    paragraphs: [
      'El planeta mas lejano conocido. Fue predicho matematicamente antes de ser observado.',
      'Vientos supersónicos y una atmósfera de hidrogeno, helio y metano le dan su tono azul.',
    ],
    camera: { type: 'planet', planetId: 'neptune' },
    showOrbits: true,
    showLabels: true,
  },
  {
    id: 'closing',
    title: 'Listo',
    paragraphs: [
      'Eso fue el recorrido por los ocho planetas. Recuerda: aqui todo esta comprimido, pero las velocidades orbitales si respetan los periodos reales.',
      'Ahora puedes explorar libre, abrir las pestanas del panel y subirle al tiempo hasta que Mercurio vuele.',
    ],
    camera: { type: 'overview' },
    showOrbits: true,
    showLabels: true,
  },
]

export function getTeacherStep(index: number): TeacherStep | undefined {
  return TEACHER_STEPS[index]
}

export const TEACHER_STEP_COUNT = TEACHER_STEPS.length
