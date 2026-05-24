import { TEACHER_STEP_COUNT } from '../data/content/teacherMode'
import { useAppStore } from '../store/useAppStore'

export function TeacherModeControls() {
  const phase = useAppStore((s) => s.phase)
  const teacherStepIndex = useAppStore((s) => s.teacherStepIndex)
  const startTeacherMode = useAppStore((s) => s.startTeacherMode)
  const exitTeacherMode = useAppStore((s) => s.exitTeacherMode)
  const nextTeacherStep = useAppStore((s) => s.nextTeacherStep)
  const prevTeacherStep = useAppStore((s) => s.prevTeacherStep)

  if (phase !== 'teacher') {
    return (
      <div className="teacher-hud">
        <button
          type="button"
          className="teacher-hud__start"
          onClick={startTeacherMode}
          title="Iniciar presentacion guiada paso a paso"
        >
          Modo profesor
        </button>
      </div>
    )
  }

  const isFirst = teacherStepIndex === 0
  const isLast = teacherStepIndex === TEACHER_STEP_COUNT - 1

  return (
    <div className="teacher-hud teacher-hud--active">
      <p className="teacher-hud__label">
        Presentacion {teacherStepIndex + 1}/{TEACHER_STEP_COUNT}
      </p>
      <div className="teacher-hud__row">
        <button
          type="button"
          className="teacher-hud__btn"
          onClick={prevTeacherStep}
          disabled={isFirst}
        >
          Anterior
        </button>
        <button
          type="button"
          className="teacher-hud__btn teacher-hud__btn--primary"
          onClick={nextTeacherStep}
          disabled={isLast}
        >
          Siguiente
        </button>
        <button
          type="button"
          className="teacher-hud__btn teacher-hud__btn--exit"
          onClick={exitTeacherMode}
        >
          Salir
        </button>
      </div>
    </div>
  )
}


