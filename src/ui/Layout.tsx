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

  return (
    <div className={`app-layout ${introActive ? 'app-layout--intro' : ''}`}>
      <main className="viewport">
        <Viewport3D />
        <IntroOverlay />
        <TravelOverlay />

        <div className="hud-stack hud-stack--left">
          <CameraControls />
          <TeacherModeControls />
          <SimulationControls />
        </div>

        {!introActive && (
          <div className="hud-stack hud-stack--top-right">
            <HudPanel id="sidebar" title="Info" className="hud-panel--info" tabClassName="hud-tab--info">
              <Sidebar />
            </HudPanel>
            <HudPanel id="top" title="Opciones" className="hud-panel--top" tabClassName="hud-tab--top">
              <div className="top-hud">
                <HelicalMotionHud />
                <SourceLinkHud />
              </div>
            </HudPanel>
          </div>
        )}
      </main>
    </div>
  )
}
