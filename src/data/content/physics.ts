import type { TabContent } from './types'

export const physicsContent: TabContent = {
  id: 'physics',
  label: 'Fisica',
  title: 'Leyes basicas del movimiento orbital',
  intro:
    'Los planetas no "flotan" al azar: siguen reglas fisicas. Este simulador aplica una version simplificada de esas leyes, suficiente para un comportamiento creible.',
  blocks: [
    {
      heading: 'Gravedad y el Sol',
      paragraphs: [
        'La gravedad es una atraccion entre masas. El Sol, al ser muchisimo mas masivo que cualquier planeta, domina el sistema: cada planeta cae hacia el Sol pero su velocidad lateral lo mantiene en orbita.',
        'A mayor distancia, la atraccion es menor (ley del inverso del cuadrado). Por eso los planetas exteriores orbitan mas lento y tardan mas en completar una vuelta.',
      ],
    },
    {
      heading: 'Por que no caen al Sol',
      paragraphs: [
        'Un planeta en orbita esta en continuo "free fall" hacia el Sol, pero tambien se desplaza lateralmente. Si esa velocidad tangencial es la adecuada, la caida y el avance se equilibran: la trayectoria cierra en una elipse (aqui, un circulo).',
      ],
    },
    {
      heading: 'Velocidad orbital relativa',
      paragraphs: [
        'En este simulador, el angulo orbital avanza asi: angulo = (tiempo / periodo) × 2π. Mercurio (~88 dias) se mueve mucho mas rapido que Neptuno (~60 189 dias). Esa relacion es la misma que en la realidad.',
      ],
    },
    {
      heading: 'Rotacion vs. revolucion',
      paragraphs: [
        'Revolucion: una vuelta alrededor del Sol (ano). Rotacion: un giro sobre el propio eje (dia). La Tierra tarda ~365 dias en orbitar y ~1 dia en rotar. Venus rota en sentido contrario (retrograda) en la realidad; aqui usamos el valor absoluto para la animacion.',
      ],
    },
    {
      heading: 'Tercera ley de Kepler (intuicion)',
      paragraphs: [
        'Kepler descubrio que el cuadrado del periodo orbital es proporcional al cubo de la distancia media al Sol. En terminos simples: planetas lejos tardan mucho mas en orbitar. Nuestros periodos vienen de las tablas de NASA.',
      ],
      bullets: [
        'Periodo corto → orbita pequena (Mercurio)',
        'Periodo largo → orbita grande (Neptuno)',
        'No es magia: es gravedad + conservacion del momento',
      ],
    },
  ],
}
