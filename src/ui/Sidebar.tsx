import { useAppStore } from '../store/useAppStore'
import { EducationalPanel } from './EducationalPanel'
import { TeacherStepPanel } from './TeacherStepPanel'

export function Sidebar() {
  const phase = useAppStore((s) => s.phase)

  return (
    <aside className="sidebar">
      <header className="sidebar__header">
        <p className="sidebar__eyebrow">Proyecto personal · WebGL</p>
        <h1 className="sidebar__title">Sistema Solar</h1>
        <p className="sidebar__subtitle">
          {phase === 'teacher'
            ? 'Tour activo — usa los controles superiores para avanzar.'
            : 'Exploración 3D del Sistema Solar con órbitas, cámara libre y control temporal.'}
        </p>
      </header>

      {phase === 'teacher' ? <TeacherStepPanel /> : <EducationalPanel />}

      <footer className="sidebar__footer">
        <span className="sidebar__badge">React + R3F</span>
      </footer>
    </aside>
  )
}
