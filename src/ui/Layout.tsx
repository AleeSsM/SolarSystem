import { Viewport3D } from '../scene/Viewport3D'
import { useAppStore } from '../store/useAppStore'
import { CameraControls } from './CameraControls'
import { HudPanel } from './HudPanel'
import { IntroOverlay } from './IntroOverlay'
import { TravelOverlay } from './TravelOverlay'
import { SimulationControls } from './SimulationControls'
import { Sidebar } from './Sidebar'
import { KeyboardHints } from './KeyboardHints'
import { TopActionBar } from './TopActionBar'

export function Layout() {
  const introActive = useAppStore((s) => s.introActive)

  return (
    <div className={`app-layout ${introActive ? 'app-layout--intro' : ''}`}>
      <main className="viewport">
        <Viewport3D />
        <IntroOverlay />
        <TravelOverlay />

        {!introActive && <TopActionBar />}

        {!introActive && (
          <div className="hud-stack hud-stack--left">
            <CameraControls />
            <SimulationControls />
            <KeyboardHints />
          </div>
        )}

        {!introActive && (
          <HudPanel id="sidebar" title="Info" className="hud-panel--info" tabClassName="hud-tab--info">
            <Sidebar />
          </HudPanel>
        )}
      </main>
    </div>
  )
}
