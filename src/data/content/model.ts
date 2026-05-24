import type { TabContent } from './types'

export const modelContent: TabContent = {
  id: 'model',
  label: 'Detalles',
  title: 'Escala y modelo visual',
  intro:
    'Esta simulación no reproduce el Sistema Solar a escala real. Usa una escala única equilibrada: distancias comprimidas, tamaños exagerados y un Sol limitado para que el conjunto sea legible en pantalla.',
  blocks: [
    {
      heading: 'Distancias orbitales',
      paragraphs: [
        'Las órbitas siguen el orden real (Mercurio → Neptuno) con radios en unidades de escena calculados así: orbitRadius = 14 + AU^0.8 × 9.2.',
        'La curva potencial comprime el espacio exterior: Neptuno queda visible sin perder la separación entre planetas interiores.',
      ],
      bullets: [
        'Mercurio ~18 u · Venus ~21 u · Tierra ~23 u · Marte ~27 u',
        'Júpiter ~51 u · Saturno ~72 u · Urano ~108 u · Neptuno ~138 u',
      ],
    },
    {
      heading: 'Tamaños planetarios',
      paragraphs: [
        'Los radios usan proporciones lineales respecto a la Tierra (referencia 0.38 u), tomadas de ratios NASA. Júpiter es ~11× más grande que la Tierra en el modelo, no en distancia orbital.',
        'Distancia y tamaño se escalan por separado: no hay una sola escala física válida para ambos a la vez.',
      ],
    },
    {
      heading: 'El Sol',
      paragraphs: [
        'El radio del Sol se limita para que no oculte las órbitas interiores: no puede superar ~36 % de la órbita de Mercurio ni ser menor que Júpiter. Por eso el Sol se ve grande, pero no a escala astronómica real.',
      ],
    },
    {
      heading: 'Orbitas y tiempo',
      paragraphs: [
        'Las trayectorias son circulares con inclinación leve. Los periodos orbitales sí provienen de datos reales; la velocidad angular es 2π / periodo.',
        'A x1, un día simulado equivale a un día real. Los multiplicadores (x100k, x1M, etc.) aceleran el reloj manteniendo las proporciones entre planetas.',
      ],
      bullets: [
        'Tiempo Real ancla posiciones a la fecha actual',
        'Pausa / play en cualquier momento',
      ],
    },
    {
      heading: 'Arquitectura',
      paragraphs: [
        'La simulación vive en simulation/ (sin Three.js). La escena solo renderiza. Los datos están en data/.',
      ],
    },
  ],
}
