import * as THREE from 'three'
import { easeOutCubic } from './introSequence'

export type TravelStage = 'approach' | 'reveal'

export const TRAVEL_DURATIONS = {
  approach: 0.9,
  reveal: 0.65,
} as const

const _a = new THREE.Vector3()
const _b = new THREE.Vector3()

function getTravelViews(planetPos: THREE.Vector3, planetRadius: number) {
  const scale = Math.max(planetRadius, 0.5)
  return {
    swoop: {
      position: planetPos.clone().add(new THREE.Vector3(scale * 16, scale * 5, scale * 20)),
      target: planetPos.clone(),
    },
    hero: {
      position: planetPos.clone().add(new THREE.Vector3(0.35, scale * 2.4, scale * 8.5)),
      target: planetPos.clone(),
    },
    heroPush: {
      position: planetPos.clone().add(new THREE.Vector3(0.2, scale * 2.1, scale * 7)),
      target: planetPos.clone(),
    },
  }
}

export function sampleTravelFrame(
  stage: TravelStage,
  t: number,
  planetPos: THREE.Vector3,
  planetRadius: number,
  startPos: THREE.Vector3,
  startTarget: THREE.Vector3,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3,
): number {
  const views = getTravelViews(planetPos, planetRadius)

  switch (stage) {
    case 'approach': {
      if (t <= 0.06) {
        outPos.copy(startPos)
        outTarget.copy(startTarget)
        return 52
      }
      const localT = (t - 0.06) / 0.94
      const eOut = easeOutCubic(localT)
      _a.lerpVectors(startPos, views.swoop.position, eOut * 0.55)
      _b.lerpVectors(views.swoop.position, views.hero.position, easeOutCubic(Math.max(0, (localT - 0.35) / 0.65)))
      outPos.lerpVectors(_a, _b, localT > 0.35 ? easeOutCubic((localT - 0.35) / 0.65) : 0)
      outTarget.lerpVectors(startTarget, views.hero.target, eOut)
      return 54 - eOut * 2
    }
    case 'reveal': {
      outPos.lerpVectors(views.hero.position, views.heroPush.position, easeOutCubic(t) * 0.35)
      outTarget.copy(views.hero.target)
      return 52
    }
  }
}
