import * as THREE from 'three'
import { SYSTEM_OVERVIEW } from './constants'

export type IntroStage = 'void' | 'swoop' | 'hero' | 'hold' | 'pullback'

export const INTRO_START = {
  position: new THREE.Vector3(-240, 420, 900),
  target: new THREE.Vector3(0, 0, 0),
} as const

export const INTRO_SWOOP = {
  position: new THREE.Vector3(130, 72, 240),
  target: new THREE.Vector3(0, 0, 0),
} as const

export const INTRO_HERO = {
  position: new THREE.Vector3(1.2, 11, 15),
  target: new THREE.Vector3(0, -4.5, 0),
} as const

export const INTRO_HERO_PUSH = {
  position: new THREE.Vector3(0.8, 10.5, 12.5),
  target: new THREE.Vector3(0, -4.5, 0),
} as const

export const INTRO_PULLBACK_MID = {
  position: new THREE.Vector3(180, 130, 200),
  target: new THREE.Vector3(0, 0, 0),
} as const

export const INTRO_DURATIONS = {
  void: 1.6,
  swoop: 2.8,
  hero: 2.4,
  hold: 2.8,
  pullback: 5,
} as const

const _a = new THREE.Vector3()
const _b = new THREE.Vector3()
const _c = new THREE.Vector3()
const _pullbackMid = new THREE.Vector3()

export function easeInOutCubic(t: number): number {
  const x = Math.min(1, Math.max(0, t))
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export function easeOutCubic(t: number): number {
  const x = Math.min(1, Math.max(0, t))
  return 1 - Math.pow(1 - x, 3)
}

function bezier3(
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3,
  t: number,
  out: THREE.Vector3,
) {
  const u = 1 - t
  out
    .copy(p0)
    .multiplyScalar(u * u * u)
    .add(_a.copy(p1).multiplyScalar(3 * u * u * t))
    .add(_b.copy(p2).multiplyScalar(3 * u * t * t))
    .add(_c.copy(p3).multiplyScalar(t * t * t))
}

function getSwoopEnd(outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  sampleIntroFrame('swoop', 1, 0, outPos, outTarget)
}

export function sampleIntroFrame(
  stage: IntroStage,
  t: number,
  holdElapsed: number,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3,
): number {
  const overviewPos = SYSTEM_OVERVIEW.position
  const overviewTarget = SYSTEM_OVERVIEW.target
  _pullbackMid.set(60, SYSTEM_OVERVIEW.position.y * 0.55, 60)

  switch (stage) {
    case 'void': {
      const e = easeOutCubic(t)
      outPos.copy(INTRO_START.position).lerp(INTRO_SWOOP.position, e * 0.06)
      outTarget.copy(INTRO_START.target)
      return 52
    }
    case 'swoop': {
      const e = easeInOutCubic(t)
      const p0 = INTRO_START.position
      const p1 = INTRO_SWOOP.position
      const p2 = INTRO_HERO.position.clone().lerp(INTRO_SWOOP.position, 0.5)
      _a.copy(p0).lerp(p1, e)
      _b.copy(p1).lerp(p2, e)
      outPos.copy(_a.lerp(_b, e))
      outTarget.copy(INTRO_START.target).lerp(INTRO_HERO.target, easeOutCubic(t))
      return 52 + e * 4
    }
    case 'hero': {
      getSwoopEnd(_a, _b)
      const e = easeOutCubic(t)
      outPos.lerpVectors(_a, INTRO_HERO.position, e)
      outTarget.lerpVectors(_b, INTRO_HERO.target, e)
      return 56 - e * 2
    }
    case 'hold': {
      const e = easeOutCubic(Math.min(1, holdElapsed / INTRO_DURATIONS.hold))
      outPos.lerpVectors(INTRO_HERO.position, INTRO_HERO_PUSH.position, e * 0.4)
      outTarget.copy(INTRO_HERO.target)
      return 54
    }
    case 'pullback': {
      const e = easeInOutCubic(t)
      bezier3(
        INTRO_HERO_PUSH.position,
        INTRO_PULLBACK_MID.position,
        _pullbackMid,
        overviewPos,
        e,
        outPos,
      )
      outTarget.lerpVectors(INTRO_HERO.target, overviewTarget, easeOutCubic(e))
      return 54 + e * 1
    }
  }
}
