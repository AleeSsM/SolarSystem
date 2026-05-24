import { useAppStore } from '../store/useAppStore'

export function LoadingOverlay() {
  const active = useAppStore((s) => s.assetLoadingActive)
  const progress = useAppStore((s) => s.assetLoadingProgress)

  if (!active && progress >= 100) return null

  const pct = Math.min(100, Math.round(progress))

  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-busy={active}>
      <div className="loading-overlay__card">
        <p className="loading-overlay__title">Cargando sistema solar</p>
        <div className="loading-overlay__bar">
          <div className="loading-overlay__fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="loading-overlay__pct">{pct}%</p>
      </div>
    </div>
  )
}
