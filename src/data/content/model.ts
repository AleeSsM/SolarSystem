import type { TabContent } from './types'

export const modelContent: TabContent = {
  id: 'model',
  label: 'Detalles',
  title: 'Como esta hecho el modelo',
  intro:
    'No es el Sistema Solar a escala real. Es una version trucada para que se vea bien en pantalla y aun asi se comporte de forma creible.',
  blocks: [
    {
      heading: 'Distancias comprimidas',
      paragraphs: [
        'Neptuno esta unas 30 veces mas lejos que la Tierra. Si usaramos escala real, los planetas interiores serian puntitos.',
        'La formula es algo asi: orbitRadius = 12 + UA^0.65 × 10. Tierra a ~22 unidades, Neptuno a ~124.',
      ],
    },
    {
      heading: 'Planetas mas gordos de lo debido',
      paragraphs: [
        'A escala real serian imperceptibles. Los hice mas grandes a proposito para distinguirlos desde lejos.',
      ],
    },
    {
      heading: 'Orbitas circulares',
      paragraphs: [
        'En la vida real son elipses. Aqui circulos con un poco de inclinacion — suficiente para ver el movimiento sin volver loco el codigo.',
      ],
    },
    {
      heading: 'Tiempo',
      paragraphs: [
        'A x1 un dia simulado = un dia real. Los botones x100k, x1M, etc. aceleran todo manteniendo las proporciones entre planetas.',
      ],
      bullets: [
        'Mercurio sigue yendo mas rapido que Neptuno',
        'Pausa / play cuando quieras',
        'Tiempo Real ancla a la fecha de hoy',
      ],
    },
    {
      heading: 'Codigo',
      paragraphs: [
        'La simulacion vive en simulation/ (sin Three.js). La escena solo pinta. Los datos estan en data/. Asi es mas facil de mantener.',
      ],
    },
  ],
}
