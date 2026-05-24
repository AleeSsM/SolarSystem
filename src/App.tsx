import { useAppBootstrap } from './hooks/useAppBootstrap'
import { Layout } from './ui/Layout'
import { AmbientAudio } from './ui/AmbientAudio'
import { LoadingOverlay } from './ui/LoadingOverlay'
import './App.css'

function App() {
  useAppBootstrap()

  return (
    <>
      <LoadingOverlay />
      <AmbientAudio />
      <Layout />
    </>
  )
}

export default App
