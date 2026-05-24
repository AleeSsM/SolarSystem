import type { TabContent } from './types'

export const modelContent: TabContent = {
  id: 'model',
  label: 'Modelo',
  title: 'Que simplifica este simulador',
  intro:
    'Este proyecto no replica el Sistema Solar a escala real. Usa un modelo visual coherente: las proporciones estan ajustadas para que puedas ver, entender y explorar.',
  blocks: [
    {
      heading: 'Distancias comprimidas',
      paragraphs: [
        'En la realidad, Neptuno esta 30 veces mas lejos del Sol que la Tierra. A escala real, los planetas interiores serian invisibles si quisieras ver todo el sistema.',
        'Usamos una escala potencial: orbitRadius = 12 + UA^0.65 × 10. La Tierra queda a 22 unidades; Neptuno a ~124. Ver docs/escalas.md para detalle.',
      ],
    },
    {
      heading: 'Tamanos exagerados',
      paragraphs: [
        'Si los planetas fueran a escala con las distancias, se verian como puntos. Los radios estan exagerados (Jupiter ~2.5× el tamano visual de la Tierra, no 11×) para distinguirlos desde lejos.',
      ],
    },
    {
      heading: 'Orbitas circulares',
      paragraphs: [
        'Las orbitas reales son elipses (la excentricidad de Mercurio es notable). Aqui usamos circulos en planos ligeramente inclinados: suficiente para visualizar el movimiento sin complejidad excesiva.',
      ],
    },
    {
      heading: 'Tiempo a escala real',
      paragraphs: [
        'Con timeScale = x1, un dia simulado equivale a un dia real: la Tierra tarda ~365 dias en completar una orbita, igual que en la naturaleza. Los multiplicadores x100k, x1M, x10M y x100M aceleran ese ritmo manteniendo las proporciones entre periodos orbitales (datos NASA).',
      ],
      bullets: [
        'Velocidades angulares basadas en periodos reales',
        'Pausa, play y multiplicadores x100k–x100M',
        'Rotacion propia independiente de la orbita',
      ],
    },
    {
      heading: 'Arquitectura del codigo',
      paragraphs: [
        'La simulacion (simulation/) calcula posiciones sin depender de Three.js. La escena (scene/) solo renderiza. Los datos (data/) alimentan ambas capas. Esto permite documentar y extender el modelo con rigor.',
      ],
    },
  ],
}
