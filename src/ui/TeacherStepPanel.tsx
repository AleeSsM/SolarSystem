import { TEACHER_STEP_COUNT, getTeacherStep } from '../data/content/teacherMode'
import { useAppStore } from '../store/useAppStore'

export function TeacherStepPanel() {
  const teacherStepIndex = useAppStore((s) => s.teacherStepIndex)
  const step = getTeacherStep(teacherStepIndex)

  if (!step) return null

  return (
    <article className="teacher-panel">
      <header className="teacher-panel__header">
        <span className="teacher-panel__badge">Modo profesor</span>
        <span className="teacher-panel__step">
          Paso {teacherStepIndex + 1} / {TEACHER_STEP_COUNT}
        </span>
      </header>
      <h2 className="teacher-panel__title">{step.title}</h2>
      {step.paragraphs.map((paragraph, index) => (
        <p key={index} className="teacher-panel__text">
          {paragraph}
        </p>
      ))}
    </article>
  )
}
