import { TIME_SCALE_OPTIONS, formatTimeScaleLabel, formatTimeScaleTitle } from '../simulation/timeControls'
import { formatSimDaysAsDate } from '../simulation/realTime'
import { useAppStore } from '../store/useAppStore'
import { formatSimulatedTime, useSimulatedTime } from '../hooks/useSimulatedTime'
import { HudPanel } from './HudPanel'

export function SimulationControls() {
  const isPaused = useAppStore((s) => s.isPaused)
  const timeScale = useAppStore((s) => s.timeScale)
  const timeMode = useAppStore((s) => s.timeMode)
  const showOrbits = useAppStore((s) => s.showOrbits)
  const showLabels = useAppStore((s) => s.showLabels)
  const setPaused = useAppStore((s) => s.setPaused)
  const setTimeScale = useAppStore((s) => s.setTimeScale)
  const toggleRealTime = useAppStore((s) => s.toggleRealTime)
  const toggleOrbits = useAppStore((s) => s.toggleOrbits)
  const toggleLabels = useAppStore((s) => s.toggleLabels)
  const planetFill = useAppStore((s) => s.planetFill)
  const setPlanetFill = useAppStore((s) => s.setPlanetFill)
  const introActive = useAppStore((s) => s.introActive)
  const simulatedDays = useSimulatedTime()
  const isRealTime = timeMode === 'realTime'

  if (introActive) return null

  const timeLabel = isRealTime ? 'Fecha simulada' : 'Tiempo simulado'
  const timeValue = isRealTime
    ? formatSimDaysAsDate(simulatedDays)
    : formatSimulatedTime(simulatedDays)

  return (
    <HudPanel id="time" title="Tiempo" className="hud-panel--fit" tabClassName="hud-tab--time">
      <div className="sim-hud sim-hud--embedded">
        <div className="sim-hud__time">
          <span className="sim-hud__time-label">{timeLabel}</span>
          <span className="sim-hud__time-value">{timeValue}</span>
        </div>
        <div className="sim-hud__row">
          <button
            type="button"
            className={`sim-hud__btn sim-hud__btn--play ${!isPaused ? 'sim-hud__btn--active' : ''}`}
            onClick={() => setPaused(false)}
            title="Reanudar orbitas"
          >
            Play
          </button>
          <button
            type="button"
            className={`sim-hud__btn ${isPaused ? 'sim-hud__btn--active' : ''}`}
            onClick={() => setPaused(true)}
            title="Pausar orbitas"
          >
            Pausa
          </button>
          <button
            type="button"
            className={`sim-hud__btn ${isRealTime ? 'sim-hud__btn--active' : ''}`}
            onClick={toggleRealTime}
            title="Anclar posiciones a la fecha actual y avanzar desde ahi"
          >
            Tiempo Real
          </button>
        </div>
        <div className="sim-hud__row sim-hud__row--speed">
          <span className="sim-hud__label">Velocidad</span>
          <div className="sim-hud__speed-group">
            {TIME_SCALE_OPTIONS.map((scale) => (
              <button
                key={scale}
                type="button"
                className={`sim-hud__speed-btn ${timeScale === scale ? 'sim-hud__speed-btn--active' : ''}`}
                onClick={() => {
                  setTimeScale(scale)
                  if (isPaused) setPaused(false)
                }}
                title={formatTimeScaleTitle(scale, isRealTime)}
              >
                {formatTimeScaleLabel(scale)}
              </button>
            ))}
          </div>
        </div>
        <div className="sim-hud__slider-row">
          <label className="sim-hud__label" htmlFor="planet-fill">
            Brillo planetas
          </label>
          <input
            id="planet-fill"
            type="range"
            className="sim-hud__range"
            min={0}
            max={100}
            step={1}
            value={planetFill}
            onChange={(e) => setPlanetFill(Number(e.target.value))}
            title="Aclara la cara oscura del planeta sin quitar la luz solar"
          />
          <span className="sim-hud__range-value">{planetFill}%</span>
        </div>
        <div className="sim-hud__toggles">
          <label className="sim-hud__toggle">
            <input type="checkbox" checked={showOrbits} onChange={toggleOrbits} />
            Orbitas visibles
          </label>
          <label className="sim-hud__toggle">
            <input type="checkbox" checked={showLabels} onChange={toggleLabels} />
            Etiquetas
          </label>
        </div>
      </div>
    </HudPanel>
  )
}
