import { useEffect, useRef } from 'react'
import { assetUrl } from '../constants/assets'
import { useAppStore } from '../store/useAppStore'

const AUDIO_SRC = assetUrl('audio/interstellar-theme.mp3')

export function AmbientAudio() {
  const soundOn = useAppStore((s) => s.soundOn)
  const introActive = useAppStore((s) => s.introActive)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.volume = 0.32
    audio.preload = 'auto'
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!soundOn) {
      audio.pause()
      return
    }

    audio.play().catch(() => {
      /* El navegador exige un gesto; se reintenta al interactuar. */
    })
  }, [soundOn])

  useEffect(() => {
    if (introActive || !soundOn) return

    const audio = audioRef.current
    if (!audio) return

    audio.play().catch(() => {})

    const resumeOnGesture = () => {
      if (!useAppStore.getState().soundOn) return
      audio.play().catch(() => {})
    }

    window.addEventListener('pointerdown', resumeOnGesture, { once: true })
    window.addEventListener('keydown', resumeOnGesture, { once: true })

    return () => {
      window.removeEventListener('pointerdown', resumeOnGesture)
      window.removeEventListener('keydown', resumeOnGesture)
    }
  }, [introActive, soundOn])

  return null
}
