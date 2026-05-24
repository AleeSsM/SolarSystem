import type { TabContent } from './types'

export const physicsContent: TabContent = {
  id: 'physics',
  label: 'Fisica',
  title: 'Por que orbitan y no se caen',
  intro:
    'Version corta de la fisica orbital, sin formulas locas. Lo justo para entender lo que ves en pantalla.',
  blocks: [
    {
      heading: 'Gravedad del Sol',
      paragraphs: [
        'El Sol tira de todo. Cuanto mas lejos un planeta, menos fuerte el tiron (inverso del cuadrado de la distancia).',
      ],
    },
    {
      heading: 'Por que no chocan con el Sol',
      paragraphs: [
        'Cada planeta cae hacia el Sol pero tambien avanza de lado. Si la velocidad lateral es la correcta, la caida y el avance se equilibran y da una orbita.',
      ],
    },
    {
      heading: 'Velocidades',
      paragraphs: [
        'Mercurio (~88 dias por vuelta) se mueve mucho mas rapido que Neptuno (~60 000 dias). Esa relacion si la respetamos.',
      ],
    },
    {
      heading: 'Rotar vs. orbitar',
      paragraphs: [
        'Orbitar = rodear al Sol (ano). Rotar = girar sobre si mismo (dia). La Tierra hace las dos a la vez.',
      ],
    },
    {
      heading: 'Kepler en pocas palabras',
      paragraphs: [
        'Planetas lejos tardan mas en dar la vuelta. Los periodos que uso vienen de tablas publicas.',
      ],
      bullets: [
        'Cerca del Sol → orbita corta',
        'Lejos del Sol → orbita larga',
      ],
    },
  ],
}
