import { create } from 'zustand'
import {
  freezeRealTimeAnchor,
  getElapsedDays,
  reanchorRealTimeClock,
  resumeRealTimeAnchor,
  setElapsedDays,
  syncRealTimeAnchor,
} from '../hooks/useSimulationClock'
import type { EducationalTabId } from '../data/content/types'
import {
  TEACHER_STEP_COUNT,
  getTeacherStep,
  type TeacherStep,
} from '../data/content/teacherMode'

export type AppPhase = 'explore' | 'teacher'
export type CameraMode = 'free' | 'follow'
export type CameraTransition = 'follow' | 'overview' | 'sun' | null
export type TimeMode = 'simulated' | 'realTime'

interface AppState {
  phase: AppPhase
  teacherStepIndex: number
  selectedPlanetId: string | null
  hoveredPlanetId: string | null
  isPaused: boolean
  timeScale: number
  timeMode: TimeMode
  showOrbits: boolean
  showLabels: boolean
  /** 0–100: relleno uniforme en planetas/lunas (no afecta la luz del Sol). */
  planetFill: number
  activeEducationalTab: EducationalTabId

  cameraMode: CameraMode
  followPlanetId: string | null
  cameraTransition: CameraTransition

  setPhase: (phase: AppPhase) => void
  selectPlanet: (id: string | null) => void
  setHoveredPlanet: (id: string | null) => void
  setPaused: (paused: boolean) => void
  setTimeScale: (scale: number) => void
  setTimeMode: (mode: TimeMode) => void
  toggleRealTime: () => void
  toggleOrbits: () => void
  toggleLabels: () => void
  setPlanetFill: (value: number) => void
  setActiveEducationalTab: (tab: EducationalTabId) => void

  followPlanet: (id: string) => void
  resetCamera: () => void
  setCameraFree: () => void
  completeCameraTransition: () => void

  applyTeacherStep: (index: number) => void
  startTeacherMode: () => void
  exitTeacherMode: () => void
  nextTeacherStep: () => void
  prevTeacherStep: () => void
}

function cameraStateFromStep(step: TeacherStep): Partial<AppState> {
  const base = {
    showOrbits: step.showOrbits,
    showLabels: step.showLabels,
    activeEducationalTab: 'system' as EducationalTabId,
    selectedPlanetId: null as string | null,
  }

  if (step.camera.type === 'planet') {
    return {
      ...base,
      cameraMode: 'follow' as CameraMode,
      followPlanetId: step.camera.planetId,
      cameraTransition: 'follow' as CameraTransition,
      selectedPlanetId: step.camera.planetId,
      activeEducationalTab: 'planet',
    }
  }

  if (step.camera.type === 'sun') {
    return {
      ...base,
      cameraMode: 'free' as CameraMode,
      followPlanetId: null,
      cameraTransition: 'sun' as CameraTransition,
    }
  }

  return {
    ...base,
    cameraMode: 'free' as CameraMode,
    followPlanetId: null,
    cameraTransition: 'overview' as CameraTransition,
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  phase: 'explore',
  teacherStepIndex: 0,
  selectedPlanetId: null,
  hoveredPlanetId: null,
  isPaused: false,
  timeScale: 1,
  timeMode: 'simulated',
  showOrbits: true,
  showLabels: false,
  planetFill: 20,
  activeEducationalTab: 'system',

  cameraMode: 'free',
  followPlanetId: null,
  cameraTransition: null,

  setPhase: (phase) => set({ phase }),
  selectPlanet: (id) => set({ selectedPlanetId: id }),
  setHoveredPlanet: (id) => set({ hoveredPlanetId: id }),
  setPaused: (paused) => {
    const { isPaused, timeMode, timeScale } = get()
    if (paused && !isPaused && timeMode === 'realTime') {
      freezeRealTimeAnchor(timeScale)
    } else if (!paused && isPaused && timeMode === 'realTime') {
      resumeRealTimeAnchor()
    }
    set({ isPaused: paused })
  },
  setTimeScale: (scale) => {
    const { timeMode, timeScale: currentScale, isPaused } = get()
    if (timeMode === 'realTime' && !isPaused && scale !== currentScale) {
      reanchorRealTimeClock(currentScale)
    }
    set({ timeScale: scale })
  },
  setTimeMode: (mode) => set({ timeMode: mode }),
  toggleRealTime: () => {
    const enteringRealTime = get().timeMode !== 'realTime'
    if (enteringRealTime) {
      syncRealTimeAnchor()
      set({ timeMode: 'realTime', isPaused: false })
      return
    }

    setElapsedDays(getElapsedDays())
    set({ timeMode: 'simulated' })
  },
  toggleOrbits: () => set((s) => ({ showOrbits: !s.showOrbits })),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
  setPlanetFill: (value) => set({ planetFill: Math.min(100, Math.max(0, value)) }),
  setActiveEducationalTab: (tab) => set({ activeEducationalTab: tab }),

  followPlanet: (id) =>
    set({
      cameraMode: 'follow',
      followPlanetId: id,
      cameraTransition: 'follow',
      selectedPlanetId: id,
      activeEducationalTab: 'planet',
    }),

  resetCamera: () =>
    set({
      cameraMode: 'free',
      followPlanetId: null,
      cameraTransition: 'overview',
      selectedPlanetId: null,
      hoveredPlanetId: null,
    }),

  setCameraFree: () =>
    set({
      cameraMode: 'free',
      followPlanetId: null,
      cameraTransition: null,
    }),

  completeCameraTransition: () => set({ cameraTransition: null }),

  applyTeacherStep: (index) => {
    const step = getTeacherStep(index)
    if (!step) return
    set({ teacherStepIndex: index, ...cameraStateFromStep(step) })
  },

  startTeacherMode: () => {
    set({
      phase: 'teacher',
      teacherStepIndex: 0,
      isPaused: false,
      timeScale: 20,
    })
    get().applyTeacherStep(0)
  },

  exitTeacherMode: () => {
    set({
      phase: 'explore',
      teacherStepIndex: 0,
      timeScale: 1,
      showOrbits: true,
      showLabels: false,
      cameraMode: 'free',
      followPlanetId: null,
      cameraTransition: 'overview',
      selectedPlanetId: null,
      hoveredPlanetId: null,
      activeEducationalTab: 'system',
    })
  },

  nextTeacherStep: () => {
    const next = Math.min(get().teacherStepIndex + 1, TEACHER_STEP_COUNT - 1)
    get().applyTeacherStep(next)
  },

  prevTeacherStep: () => {
    const prev = Math.max(get().teacherStepIndex - 1, 0)
    get().applyTeacherStep(prev)
  },
}))
