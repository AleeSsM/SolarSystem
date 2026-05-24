import { useAppBootstrap } from './hooks/useAppBootstrap'
import { Layout } from './ui/Layout'
import { AmbientAudio } from './ui/AmbientAudio'
import { KeyboardHints } from './ui/KeyboardHints'
import { LoadingOverlay } from './ui/LoadingOverlay'
import { ScaleCompareHud } from './ui/ScaleCompareHud'
import './App.css'

function App() {
  useAppBootstrap()

  return (
    <>
      <LoadingOverlay />
      <AmbientAudio />
      <Layout />
      <ScaleCompareHud />
      <KeyboardHints />
    </>
  )
}

export default App
