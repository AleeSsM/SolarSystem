import { getSkyTonight, visibilityLabel, type SkyVisibility } from '../data/skyTonight'
import { useAppStore } from '../store/useAppStore'

function visibilityClass(v: SkyVisibility) {
  switch (v) {
    case 'excelente':
      return 'sky-tonight__badge--great'
    case 'visible':
      return 'sky-tonight__badge--ok'
    case 'baja':
      return 'sky-tonight__badge--low'
    case 'sol':
      return 'sky-tonight__badge--sun'
  }
}

export function SkyTonightCard() {
  const timeMode = useAppStore((s) => s.timeMode)
  const entries = getSkyTonight(new Date())
  const favorable = entries.filter((e) => e.visibility === 'excelente' || e.visibility === 'visible')

  return (
    <article className="sky-tonight">
      <h3 className="sky-tonight__heading">Hoy en el cielo</h3>
      <p className="sky-tonight__intro">
        Estimación orientativa según la fecha de tu dispositivo
        {timeMode === 'realTime' ? ' (alineada con Tiempo Real).' : '.'} No sustituye efemérides profesionales.
      </p>
      <p className="sky-tonight__summary">
        {favorable.length > 0
          ? `${favorable.map((e) => e.name).join(', ')} ${favorable.length === 1 ? 'tiene' : 'tienen'} buena visibilidad esta noche.`
          : 'Hoy predominan condiciones difíciles; revisa al amanecer o atardecer.'}
      </p>
      <ul className="sky-tonight__list">
        {entries.map((entry) => (
          <li key={entry.id} className="sky-tonight__item">
            <div className="sky-tonight__row">
              <span className="sky-tonight__name">{entry.name}</span>
              <span className={`sky-tonight__badge ${visibilityClass(entry.visibility)}`}>
                {visibilityLabel(entry.visibility)}
              </span>
            </div>
            <p className="sky-tonight__note">{entry.note}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
