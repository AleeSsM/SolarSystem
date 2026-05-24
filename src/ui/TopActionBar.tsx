import { TEACHER_STEP_COUNT } from '../data/content/teacherMode'
import { useAppStore } from '../store/useAppStore'
import { HelicalMotionHud } from './HelicalMotionHud'
import { SourceLinkHud } from './SourceLinkHud'

export function TopActionBar() {
  const introActive = useAppStore((s) => s.introActive)
  const travelActive = useAppStore((s) => s.travelActive)
  const phase = useAppStore((s) => s.phase)
  const teacherStepIndex = useAppStore((s) => s.teacherStepIndex)
  const startTeacherMode = useAppStore((s) => s.startTeacherMode)
  const exitTeacherMode = useAppStore((s) => s.exitTeacherMode)
  const nextTeacherStep = useAppStore((s) => s.nextTeacherStep)
  const prevTeacherStep = useAppStore((s) => s.prevTeacherStep)
  const soundOn = useAppStore((s) => s.soundOn)
  const toggleSound = useAppStore((s) => s.toggleSound)

  if (introActive || travelActive) return null

  if (phase === 'teacher') {
    const isFirst = teacherStepIndex === 0
    const isLast = teacherStepIndex === TEACHER_STEP_COUNT - 1

    return (
      <div className="top-actions top-actions--tour">
        <span className="top-actions__label">
          Tour · parada {teacherStepIndex + 1}/{TEACHER_STEP_COUNT}
        </span>
        <button type="button" className="top-actions__btn" onClick={prevTeacherStep} disabled={isFirst}>
          Anterior
        </button>
        <button
          type="button"
          className="top-actions__btn top-actions__btn--primary"
          onClick={nextTeacherStep}
          disabled={isLast}
        >
          Siguiente
        </button>
        <button type="button" className="top-actions__btn top-actions__btn--exit" onClick={exitTeacherMode}>
          Salir
        </button>
      </div>
    )
  }

  return (
    <div className="top-actions">
      <button
        type="button"
        className="top-actions__btn top-actions__btn--tour"
        onClick={startTeacherMode}
        title="Recorrido guiado por el sistema solar"
      >
        Tour guiado
      </button>
      <HelicalMotionHud />
      <button
        type="button"
        className={`top-actions__btn top-actions__btn--sound ${soundOn ? 'top-actions__btn--sound-on' : ''}`}
        onClick={toggleSound}
        title="Musica ambiente (Interstellar)"
        aria-pressed={soundOn}
      >
        {soundOn ? 'Musica ON' : 'Musica'}
      </button>
      <SourceLinkHud />
    </div>
  )
}
