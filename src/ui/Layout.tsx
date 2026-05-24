import { Viewport3D } from '../scene/Viewport3D'
import { useAppStore } from '../store/useAppStore'
import { CameraControls } from './CameraControls'
import { HelicalMotionHud } from './HelicalMotionHud'
import { HudPanel } from './HudPanel'
import { IntroOverlay } from './IntroOverlay'
import { TravelOverlay } from './TravelOverlay'
import { SourceLinkHud } from './SourceLinkHud'
import { SimulationControls } from './SimulationControls'
import { TeacherModeControls } from './TeacherModeControls'
import { Sidebar } from './Sidebar'

export function Layout() {
  const introActive = useAppStore((s) => s.introActive)
  const sidebarOpen = useAppStore((s) => s.hudPanels.sidebar)
  const toggleHudPanel = useAppStore((s) => s.toggleHudPanel)

  return (
    <div
      className={`app-layout ${introActive ? 'app-layout--intro' : ''} ${!sidebarOpen ? 'app-layout--no-sidebar' : ''}`}
    >
      <main className="viewport">
        <Viewport3D />
        <HudPanel id="top" title="Opciones" className="hud-panel--top" tabClassName="hud-tab--top">
          <div className="top-hud">
            <HelicalMotionHud />
            <SourceLinkHud />
          </div>
        </HudPanel>
        <IntroOverlay />
        <TravelOverlay />
        <div className="hud-stack hud-stack--left">
          <CameraControls />
          <TeacherModeControls />
        </div>
        <SimulationControls />
        {!introActive && !sidebarOpen && (
          <button
            type="button"
            className="hud-tab hud-tab--sidebar"
            onClick={() => toggleHudPanel('sidebar')}
          >
            Info
          </button>
        )}
      </main>
      {!introActive && sidebarOpen && (
        <HudPanel id="sidebar" title="Info" className="hud-panel--sidebar" tabClassName="hud-tab--sidebar">
          <Sidebar />
        </HudPanel>
      )}
    </div>
  )
}
