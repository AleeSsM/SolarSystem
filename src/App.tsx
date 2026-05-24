import { useAppBootstrap } from './hooks/useAppBootstrap'
import { Layout } from './ui/Layout'
import { AmbientAudio } from './ui/AmbientAudio'
import './App.css'

function App() {
  useAppBootstrap()

  return (
    <>
      <AmbientAudio />
      <Layout />
    </>
  )
}

export default App
