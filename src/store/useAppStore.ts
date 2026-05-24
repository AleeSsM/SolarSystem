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

export type HudPanelId = 'camera' | 'time' | 'sidebar'

const DEFAULT_HUD_PANELS: Record<HudPanelId, boolean> = {
  camera: true,
  time: true,
  sidebar: true,
}

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
  hudPanels: Record<HudPanelId, boolean>
  /** Animacion de entrada activa (bloquea interaccion). */
  introActive: boolean
  introTitleVisible: boolean
  /** Viaje cinematografico al seleccionar planeta. */
  travelActive: boolean
  travelPlanetId: string | null
  travelTitleVisible: boolean
  travelInfoRevealed: boolean
  /** Incrementa en cada viaje para reiniciar animacion (click o select). */
  travelRequestId: number
  /** Modo helicoidal: Sol avanza en linea recta y planetas en plano XY. */
  helicalMotion: boolean
  helicalMotionStartDays: number
  /** 0 = zoom out, 100 = zoom in (solo al seguir planeta). */
  followZoom: number
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
  toggleHudPanel: (id: HudPanelId) => void
  setFollowZoom: (value: number) => void
  setIntroTitleVisible: (visible: boolean) => void
  finishIntro: () => void
  setTravelTitleVisible: (visible: boolean) => void
  finishTravel: () => void
  cancelTravel: () => void
  toggleHelicalMotion: () => void
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
  isPaused: true,
  timeScale: 1_000_000,
  timeMode: 'simulated',
  showOrbits: true,
  showLabels: false,
  planetFill: 20,
  hudPanels: { ...DEFAULT_HUD_PANELS },
  introActive: true,
  introTitleVisible: false,
  travelActive: false,
  travelPlanetId: null,
  travelTitleVisible: false,
  travelInfoRevealed: true,
  travelRequestId: 0,
  helicalMotion: false,
  helicalMotionStartDays: 0,
  followZoom: 42,
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
    const allowed = scale <= 1_000_000_000 ? scale : 1_000_000_000
    if (timeMode === 'realTime' && !isPaused && allowed !== currentScale) {
      reanchorRealTimeClock(currentScale)
    }
    set({ timeScale: allowed })
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
  toggleHudPanel: (id) =>
    set((s) => ({
      hudPanels: { ...s.hudPanels, [id]: !s.hudPanels[id] },
    })),
  setFollowZoom: (value) => set({ followZoom: Math.min(100, Math.max(0, value)) }),
  setIntroTitleVisible: (visible) => set({ introTitleVisible: visible }),
  finishIntro: () =>
    set({
      introActive: false,
      introTitleVisible: false,
      isPaused: false,
      cameraMode: 'free',
      followPlanetId: null,
      cameraTransition: 'overview',
    }),
  setTravelTitleVisible: (visible) => set({ travelTitleVisible: visible }),
  finishTravel: () =>
    set({
      travelActive: false,
      travelPlanetId: null,
      travelTitleVisible: false,
      travelInfoRevealed: true,
      cameraTransition: null,
    }),
  cancelTravel: () =>
    set({
      travelActive: false,
      travelPlanetId: null,
      travelTitleVisible: false,
      travelInfoRevealed: true,
    }),
  toggleHelicalMotion: () => {
    const { helicalMotion, isPaused } = get()
    if (helicalMotion) {
      set({ helicalMotion: false, helicalMotionStartDays: 0 })
      return
    }
    set({
      helicalMotion: true,
      helicalMotionStartDays: getElapsedDays(),
      ...(isPaused ? { isPaused: false } : {}),
    })
  },
  setActiveEducationalTab: (tab) => set({ activeEducationalTab: tab }),

  followPlanet: (id) => {
    const { introActive, phase } = get()
    if (introActive || phase === 'teacher') {
      set({
        cameraMode: 'follow',
        followPlanetId: id,
        cameraTransition: 'follow',
        selectedPlanetId: id,
        activeEducationalTab: 'planet',
        followZoom: 42,
        travelInfoRevealed: true,
      })
      return
    }

    set({
      travelActive: true,
      travelPlanetId: id,
      travelTitleVisible: false,
      travelInfoRevealed: false,
      travelRequestId: get().travelRequestId + 1,
      cameraMode: 'follow',
      followPlanetId: id,
      cameraTransition: null,
      selectedPlanetId: id,
      activeEducationalTab: 'planet',
    })
  },

  resetCamera: () => {
    get().cancelTravel()
    set({
      cameraMode: 'free',
      followPlanetId: null,
      cameraTransition: 'overview',
      selectedPlanetId: null,
      hoveredPlanetId: null,
    })
  },

  setCameraFree: () => {
    get().cancelTravel()
    set({
      cameraMode: 'free',
      followPlanetId: null,
      cameraTransition: null,
    })
  },

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
      timeScale: 1_000_000,
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
