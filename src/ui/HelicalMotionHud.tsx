import { useAppStore } from '../store/useAppStore'

function HelixIcon() {
  return (
    <svg
      className="source-hud__icon"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
      <path d="M4 6h16" opacity="0.45" />
    </svg>
  )
}

export function HelicalMotionHud() {
  const introActive = useAppStore((s) => s.introActive)
  const travelActive = useAppStore((s) => s.travelActive)
  const helicalMotion = useAppStore((s) => s.helicalMotion)
  const toggleHelicalMotion = useAppStore((s) => s.toggleHelicalMotion)

  if (introActive || travelActive) return null

  return (
    <button
      type="button"
      className={`source-hud source-hud--toggle ${helicalMotion ? 'source-hud--toggle-active' : ''}`}
      onClick={toggleHelicalMotion}
      title={
        helicalMotion
          ? 'Desactivar movimiento helicoidal y estelas'
          : 'Activar movimiento helicoidal (estelas en el tiempo)'
      }
      aria-pressed={helicalMotion}
    >
      <HelixIcon />
      <span>{helicalMotion ? 'Movimiento helicoidal activo' : 'Movimiento helicoidal'}</span>
    </button>
  )
}
