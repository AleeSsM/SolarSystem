import { Viewport3D } from '../scene/Viewport3D'
import { useAppStore } from '../store/useAppStore'
import { CameraControls } from './CameraControls'
import { HelicalMotionHud } from './HelicalMotionHud'
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
        <div className="top-hud">
          <HelicalMotionHud />
          <SourceLinkHud />
        </div>
        <IntroOverlay />
        <TravelOverlay />
        <CameraControls />
        <SimulationControls />
        <TeacherModeControls />
      </main>
      {!introActive && <Sidebar />}
    </div>
  )
}
