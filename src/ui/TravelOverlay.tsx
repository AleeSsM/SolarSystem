import type { CSSProperties } from 'react'
import { getPlanetById } from '../data/planets'
import { useAppStore } from '../store/useAppStore'

export function TravelOverlay() {
  const travelActive = useAppStore((s) => s.travelActive)
  const travelTitleVisible = useAppStore((s) => s.travelTitleVisible)
  const travelPlanetId = useAppStore((s) => s.travelPlanetId)

  if (!travelActive || !travelTitleVisible || !travelPlanetId) return null

  const planet = getPlanetById(travelPlanetId)
  if (!planet) return null

  return (
    <div className="intro-overlay intro-overlay--travel travel-overlay" aria-hidden={false}>
      <div className="intro-overlay__scrim intro-overlay__scrim--visible" aria-hidden />
      <div
        className="intro-overlay__title-block intro-overlay__title-block--travel intro-overlay__title-block--visible"
        style={{ '--travel-accent': planet.orbitColor } as CSSProperties}
      >
        <p className="intro-overlay__eyebrow">Viajando a</p>
        <h1 className="intro-overlay__title">
          <span className="intro-overlay__title-line travel-overlay__name">{planet.name}</span>
        </h1>
        <div className="intro-overlay__divider travel-overlay__divider" />
      </div>
    </div>
  )
}
