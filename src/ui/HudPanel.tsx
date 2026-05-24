import type { ReactNode } from 'react'
import { useAppStore, type HudPanelId } from '../store/useAppStore'

interface HudPanelProps {
  id: HudPanelId
  title: string
  className?: string
  tabClassName?: string
  children: ReactNode
}

export function HudPanel({ id, title, className = '', tabClassName = '', children }: HudPanelProps) {
  const isOpen = useAppStore((s) => s.hudPanels[id])
  const toggleHudPanel = useAppStore((s) => s.toggleHudPanel)

  if (!isOpen) {
    return (
      <button
        type="button"
        className={`hud-tab ${tabClassName}`}
        onClick={() => toggleHudPanel(id)}
        aria-label={`Mostrar ${title}`}
      >
        {title}
      </button>
    )
  }

  return (
    <div className={`hud-panel ${className}`}>
      <div className="hud-panel__header">
        <span className="hud-panel__title">{title}</span>
        <button
          type="button"
          className="hud-panel__hide"
          onClick={() => toggleHudPanel(id)}
          aria-label={`Ocultar ${title}`}
        >
          −
        </button>
      </div>
      <div className="hud-panel__body">{children}</div>
    </div>
  )
}
