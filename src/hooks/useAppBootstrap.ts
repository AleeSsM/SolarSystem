import { useEffect, useRef } from 'react'
import { getPlanetById } from '../data/planets'
import { initAnalytics, trackPageView } from '../lib/analytics'
import { useAppStore } from '../store/useAppStore'

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

export function useAppBootstrap() {
  const introActive = useAppStore((s) => s.introActive)

  useEffect(() => {
    initAnalytics()
    trackPageView()
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return
      const state = useAppStore.getState()
      if (state.introActive) return

      const key = e.key.toLowerCase()

      if (key === ' ') {
        e.preventDefault()
        state.setPaused(!state.isPaused)
        return
      }
      if (key === 'r') {
        state.resetCamera()
        return
      }
      if (key === 'h') {
        state.toggleHelicalMotion()
        return
      }
      if (key === 'm') {
        state.toggleSound()
        return
      }
      if (key === 'p') {
        state.togglePerformanceMode()
        return
      }
      if (key === '?') {
        state.setKeyboardHintsOpen(!state.keyboardHintsOpen)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const planetDeepLinkDone = useRef(false)

  useEffect(() => {
    if (introActive || planetDeepLinkDone.current) return

    const params = new URLSearchParams(window.location.search)
    const planetId = params.get('planet')
    if (!planetId) return

    const planet = getPlanetById(planetId)
    if (!planet) return

    planetDeepLinkDone.current = true
    const { followPlanet, setActiveEducationalTab } = useAppStore.getState()
    followPlanet(planetId)
    setActiveEducationalTab('planet')
  }, [introActive])
}
