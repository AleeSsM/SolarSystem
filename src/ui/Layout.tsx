import { Viewport3D } from '../scene/Viewport3D'
import { CameraControls } from './CameraControls'
import { IntroOverlay } from './IntroOverlay'
import { SourceLinkHud } from './SourceLinkHud'
import { SimulationControls } from './SimulationControls'
import { TeacherModeControls } from './TeacherModeControls'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="app-layout">
      <main className="viewport">
        <Viewport3D />
        <SourceLinkHud />
        <IntroOverlay />
        <CameraControls />
        <SimulationControls />
        <TeacherModeControls />
      </main>
      <Sidebar />
    </div>
  )
}
