import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import { useAppStore } from '../store/useAppStore'

export function LoadingReporter() {
  const { progress, active } = useProgress()
  const setAssetLoading = useAppStore((s) => s.setAssetLoading)

  useEffect(() => {
    setAssetLoading(active, active ? progress : 100)
  }, [active, progress, setAssetLoading])

  return null
}
