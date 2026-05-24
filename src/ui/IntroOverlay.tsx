import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

export function IntroOverlay() {
  const introActive = useAppStore((s) => s.introActive)
  const introTitleVisible = useAppStore((s) => s.introTitleVisible)
  const finishIntro = useAppStore((s) => s.finishIntro)

  useEffect(() => {
    if (!introActive) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finishIntro()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [introActive, finishIntro])

  if (!introActive) return null

  return (
    <div className="intro-overlay">
      <button
        type="button"
        className="intro-overlay__skip"
        onClick={finishIntro}
        title="Saltar intro (Esc)"
      >
        Saltar intro
      </button>
      <div
        className={`intro-overlay__title-block ${introTitleVisible ? 'intro-overlay__title-block--visible' : ''}`}
        aria-hidden={!introTitleVisible}
      >
        <p className="intro-overlay__eyebrow">Mas alla del vacio</p>
        <h1 className="intro-overlay__title">
          <span className="intro-overlay__title-line">Sistema</span>
          <span className="intro-overlay__title-line intro-overlay__title-line--accent">Solar</span>
        </h1>
        <div className="intro-overlay__divider" />
      </div>
    </div>
  )
}
