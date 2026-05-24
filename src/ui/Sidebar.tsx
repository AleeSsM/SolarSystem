import { useAppStore } from '../store/useAppStore'
import { EducationalPanel } from './EducationalPanel'
import { TeacherStepPanel } from './TeacherStepPanel'

export function Sidebar() {
  const phase = useAppStore((s) => s.phase)

  return (
    <aside className="sidebar">
      <header className="sidebar__header">
        <p className="sidebar__eyebrow">Simulador educativo 3D</p>
        <h1 className="sidebar__title">Sistema Solar</h1>
        <p className="sidebar__subtitle">
          {phase === 'teacher'
            ? 'Modo profesor activo — usa Anterior / Siguiente para presentar.'
            : 'Explora el modelo 3D o inicia el modo profesor para una demo guiada.'}
        </p>
      </header>

      {phase === 'teacher' ? <TeacherStepPanel /> : <EducationalPanel />}

      <footer className="sidebar__footer">
        <span className="sidebar__badge">Paso 9 / 11 — Fase 8</span>
      </footer>
    </aside>
  )
}
