import { useAppStore } from '../store/useAppStore'

export function KeyboardHints() {
  const introActive = useAppStore((s) => s.introActive)
  const open = useAppStore((s) => s.keyboardHintsOpen)
  const setOpen = useAppStore((s) => s.setKeyboardHintsOpen)

  if (introActive || !open) return null

  return (
    <div className="keyboard-hints">
      <button type="button" className="keyboard-hints__close" onClick={() => setOpen(false)} aria-label="Cerrar atajos">
        ×
      </button>
      <p className="keyboard-hints__title">Atajos de teclado</p>
      <ul className="keyboard-hints__list">
        <li>
          <kbd>Espacio</kbd> Pausa / reproducir
        </li>
        <li>
          <kbd>R</kbd> Vista sistema
        </li>
        <li>
          <kbd>H</kbd> Movimiento helicoidal
        </li>
        <li>
          <kbd>M</kbd> Música
        </li>
        <li>
          <kbd>P</kbd> Modo rendimiento
        </li>
        <li>
          <kbd>?</kbd> Mostrar / ocultar
        </li>
      </ul>
    </div>
  )
}
