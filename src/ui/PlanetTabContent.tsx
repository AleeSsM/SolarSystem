import { getPlanetById } from '../data/planets'
import { useAppStore } from '../store/useAppStore'

export function PlanetTabContent() {
  const selectedPlanetId = useAppStore((s) => s.selectedPlanetId)
  const selectPlanet = useAppStore((s) => s.selectPlanet)
  const setCameraFree = useAppStore((s) => s.setCameraFree)

  const planet = selectedPlanetId ? getPlanetById(selectedPlanetId) : null

  if (!planet) {
    return (
      <article className="edu-content edu-content--empty">
        <h2 className="edu-content__title">Planeta</h2>
        <p className="edu-content__intro">
          Haz clic en un planeta o elige uno en «Viajar a» para ver su información aquí.
        </p>
      </article>
    )
  }

  return (
    <article className="edu-content planet-detail">
      <header className="planet-detail__header">
        <span className="planet-detail__dot" style={{ background: planet.orbitColor }} />
        <h2 className="planet-detail__name">{planet.name}</h2>
        <button
          type="button"
          className="planet-detail__close"
          onClick={() => {
            selectPlanet(null)
            setCameraFree()
          }}
          aria-label="Cerrar ficha"
        >
          ×
        </button>
      </header>

      <dl className="planet-detail__facts">
        <div>
          <dt>Tamaño relativo</dt>
          <dd>{planet.sizeRelative}</dd>
        </div>
        <div>
          <dt>Distancia al Sol</dt>
          <dd>{planet.distanceFromSun}</dd>
        </div>
        <div>
          <dt>Temperatura</dt>
          <dd>{planet.temperature}</dd>
        </div>
        <div>
          <dt>Período orbital</dt>
          <dd>{planet.orbitalPeriodDays.toLocaleString('es')} días terrestres</dd>
        </div>
        <div>
          <dt>Rotación</dt>
          <dd>{planet.rotationPeriodDays} día(s) terrestre(s)</dd>
        </div>
      </dl>

      <section className="planet-detail__curiosity">
        <h3 className="planet-detail__curiosity-title">Dato curioso</h3>
        <p>{planet.funFact}</p>
      </section>
    </article>
  )
}
