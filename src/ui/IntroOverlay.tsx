import { useAppStore } from '../store/useAppStore'

export function IntroOverlay() {
  const introActive = useAppStore((s) => s.introActive)
  const introTitleVisible = useAppStore((s) => s.introTitleVisible)

  if (!introActive) return null

  return (
    <div className="intro-overlay" aria-hidden={!introTitleVisible}>
      <div
        className={`intro-overlay__title-block ${introTitleVisible ? 'intro-overlay__title-block--visible' : ''}`}
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
