import { PLANETS } from '../data/planets'
import { useAppStore } from '../store/useAppStore'

export function CameraControls() {
  const phase = useAppStore((s) => s.phase)
  const cameraMode = useAppStore((s) => s.cameraMode)
  const followPlanetId = useAppStore((s) => s.followPlanetId)
  const cameraTransition = useAppStore((s) => s.cameraTransition)
  const followPlanet = useAppStore((s) => s.followPlanet)
  const resetCamera = useAppStore((s) => s.resetCamera)
  const setCameraFree = useAppStore((s) => s.setCameraFree)

  if (phase === 'teacher') return null

  const isBusy = cameraTransition !== null
  const isFree = cameraMode === 'free'
  const followingName = PLANETS.find((p) => p.id === followPlanetId)?.name

  return (
    <div className="camera-hud">
      <div className="camera-hud__row">
        <button
          type="button"
          className="camera-hud__btn camera-hud__btn--primary"
          onClick={resetCamera}
          disabled={isBusy}
          title="Volver a la vista general del sistema"
        >
          Vista sistema
        </button>
        <button
          type="button"
          className={`camera-hud__btn ${isFree ? 'camera-hud__btn--active' : ''}`}
          onClick={setCameraFree}
          disabled={isBusy}
          title="Explorar libremente sin seguir ningun planeta"
        >
          Modo libre
        </button>
      </div>

      <div className="camera-hud__row">
        <label className="camera-hud__label" htmlFor="travel-select">
          Viajar a
        </label>
        <select
          id="travel-select"
          className="camera-hud__select"
          value={followPlanetId ?? ''}
          disabled={isBusy}
          onChange={(e) => {
            const id = e.target.value
            if (id) followPlanet(id)
            else setCameraFree()
          }}
        >
          <option value="">Modo libre</option>
          {PLANETS.map((planet) => (
            <option key={planet.id} value={planet.id}>
              {planet.name}
            </option>
          ))}
        </select>
      </div>

      {isFree && !isBusy && (
        <p className="camera-hud__status">
          <strong>Modo libre</strong> — arrastra para orbitar, rueda para zoom
        </p>
      )}
      {cameraMode === 'follow' && followingName && !isBusy && (
        <p className="camera-hud__status camera-hud__status--follow">
          Siguiendo <strong>{followingName}</strong> — usa Modo libre para soltar
        </p>
      )}
      {isBusy && (
        <p className="camera-hud__status camera-hud__status--busy">Transicion de camara…</p>
      )}
    </div>
  )
}
