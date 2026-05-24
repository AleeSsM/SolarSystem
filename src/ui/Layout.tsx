import { Viewport3D } from '../scene/Viewport3D'
import { CameraControls } from './CameraControls'
import { SimulationControls } from './SimulationControls'
import { TeacherModeControls } from './TeacherModeControls'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="app-layout">
      <main className="viewport">
        <Viewport3D />
        <CameraControls />
        <SimulationControls />
        <TeacherModeControls />
      </main>
      <Sidebar />
    </div>
  )
}
