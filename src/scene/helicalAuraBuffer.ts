import { HELICAL_TRAIL_Y_UNITS_PER_DAY } from '../simulation/systemMotion'

export interface HelicalAuraSample {
  x: number
  y: number
  z: number
  days: number
}

export function pushHelicalAuraSample(
  samples: HelicalAuraSample[],
  maxPoints: number,
  sample: HelicalAuraSample,
  minDistance: number,
) {
  const last = samples[samples.length - 1]
  if (last) {
    const dx = sample.x - last.x
    const dy = sample.y - last.y
    const dz = sample.z - last.z
    if (dx * dx + dy * dy + dz * dz < minDistance * minDistance) return
  }

  samples.push(sample)
  if (samples.length > maxPoints) {
    samples.splice(0, samples.length - maxPoints)
  }
}

export function buildHelicalAuraPoints(samples: HelicalAuraSample[], elapsedDays: number): Float32Array {
  const n = samples.length
  if (n === 0) return new Float32Array(0)

  const arr = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const s = samples[i]
    const ageDays = Math.max(0, elapsedDays - s.days)
    arr[i * 3] = s.x
    arr[i * 3 + 1] = s.y - ageDays * HELICAL_TRAIL_Y_UNITS_PER_DAY
    arr[i * 3 + 2] = s.z
  }
  return arr
}
