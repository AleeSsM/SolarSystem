import { useEffect, useRef } from 'react'
import { assetUrl } from '../constants/assets'
import { useAppStore } from '../store/useAppStore'

const AUDIO_SRC = assetUrl('audio/interstellar-theme.mp3')

export function AmbientAudio() {
  const soundOn = useAppStore((s) => s.soundOn)
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
    if (soundOn) {
      audio.play().catch(() => {
        useAppStore.setState({ soundOn: false })
      })
    } else {
      audio.pause()
    }
  }, [soundOn])

  return null
}
