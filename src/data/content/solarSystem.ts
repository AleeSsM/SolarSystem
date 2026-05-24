import type { TabContent } from './types'

export const solarSystemContent: TabContent = {
  id: 'system',
  label: 'Sistema Solar',
  title: 'Nuestro sistema estelar',
  intro:
    'El Sistema Solar esta formado por el Sol y todos los cuerpos que orbitan a su alrededor: ocho planetas, sus lunas, asteroides y cometas.',
  blocks: [
    {
      heading: 'El Sol',
      paragraphs: [
        'El Sol es una estrella de tipo G que concentra el 99.86% de la masa del sistema. Su gravedad mantiene a los planetas en orbita y su luz calienta los mundos rocosos y gaseosos.',
      ],
    },
    {
      heading: 'Planetas rocosos vs. gaseosos',
      paragraphs: [
        'Mercurio, Venus, Tierra y Marte son planetas teluricos: superficie solida y menor tamano. Jupiter, Saturno, Urano y Neptuno son gigantes, con atmósferas profundas de gas e hielo.',
      ],
      bullets: [
        'Interiores (Mercurio → Marte): rocas y metales',
        'Exteriores (Jupiter → Neptuno): hidrogeno, helio, hielos',
        'Cinturon de asteroides entre Marte y Jupiter',
      ],
    },
    {
      heading: 'Formacion',
      paragraphs: [
        'Hace unos 4,600 millones de anos, un disco de gas y polvo colapso formo el Sol en el centro. Los restos se aglomeraron en planetesimales y, con el tiempo, en los planetas que vemos hoy.',
      ],
    },
    {
      heading: 'Exploracion humana',
      paragraphs: [
        'Desde Sputnik y Apollo hasta misiones como Voyager, Cassini y Perseverance, hemos enviado sondas a casi todos los planetas. Este simulador condensa esos datos en una experiencia interactiva.',
      ],
    },
  ],
}
