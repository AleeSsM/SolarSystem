export type { ContentBlock, EducationalTabId, TabContent } from './types'
export { solarSystemContent } from './solarSystem'
export { modelContent } from './model'
export { physicsContent } from './physics'
export { TEACHER_STEPS, TEACHER_STEP_COUNT, getTeacherStep } from './teacherMode'
export type { TeacherStep, TeacherCameraTarget } from './teacherMode'

import type { TabContent } from './types'
import { modelContent } from './model'
import { physicsContent } from './physics'
import { solarSystemContent } from './solarSystem'

/** Pestañas estaticas (sin Planeta, que es dinamica). */
export const STATIC_TABS: TabContent[] = [solarSystemContent, modelContent, physicsContent]

export const PLANET_TAB_LABEL = 'Planeta'
