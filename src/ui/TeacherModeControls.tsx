import { TEACHER_STEP_COUNT } from '../data/content/teacherMode'
import { useAppStore } from '../store/useAppStore'
import { HudPanel } from './HudPanel'

export function TeacherModeControls() {
  const phase = useAppStore((s) => s.phase)
  const introActive = useAppStore((s) => s.introActive)
  const teacherStepIndex = useAppStore((s) => s.teacherStepIndex)
  const startTeacherMode = useAppStore((s) => s.startTeacherMode)
  const exitTeacherMode = useAppStore((s) => s.exitTeacherMode)
  const nextTeacherStep = useAppStore((s) => s.nextTeacherStep)
  const prevTeacherStep = useAppStore((s) => s.prevTeacherStep)

  if (introActive) return null

  if (phase !== 'teacher') {
    return (
      <HudPanel id="teacher" title="Tour" className="hud-panel--teacher" tabClassName="hud-tab--teacher">
        <button
          type="button"
          className="teacher-hud__start"
          onClick={startTeacherMode}
          title="Recorrido automatico por el sistema"
        >
          Tour guiado
        </button>
      </HudPanel>
    )
  }

  const isFirst = teacherStepIndex === 0
  const isLast = teacherStepIndex === TEACHER_STEP_COUNT - 1

  return (
    <HudPanel id="teacher" title="Tour" className="hud-panel--teacher" tabClassName="hud-tab--teacher">
      <div className="teacher-hud teacher-hud--active teacher-hud--embedded">
        <p className="teacher-hud__label">
          Parada {teacherStepIndex + 1} / {TEACHER_STEP_COUNT}
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
    </HudPanel>
  )
}
