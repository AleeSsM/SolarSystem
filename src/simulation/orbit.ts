export type Vec3 = [number, number, number]

/** Angulo orbital en radianes a partir del tiempo simulado (dias). */
export function computeOrbitAngle(
  elapsedDays: number,
  orbitalPeriodDays: number,
  phaseOffset = 0,
): number {
  return (elapsedDays / orbitalPeriodDays) * Math.PI * 2 + phaseOffset
}

/** Rotacion propia en radianes a partir del tiempo simulado (dias). */
export function computeRotation(elapsedDays: number, rotationPeriodDays: number): number {
  return (elapsedDays / rotationPeriodDays) * Math.PI * 2
}

/** Orbita horizontal en plano XZ (vista cenital del modelo). */
export function getCircularOrbitPosition(
  orbitRadius: number,
  angle: number,
  inclinationDeg = 0,
): Vec3 {
  const inc = (inclinationDeg * Math.PI) / 180
  const x = orbitRadius * Math.cos(angle)
  const z = orbitRadius * Math.sin(angle) * Math.cos(inc)
  const y = orbitRadius * Math.sin(angle) * Math.sin(inc)
  return [x, y, z]
}

/** Estado heliocentrico local (sin deriva galactica). */
export function computeBodyState(
  elapsedDays: number,
  orbitRadius: number,
  orbitalPeriodDays: number,
  rotationPeriodDays: number,
  inclinationDeg = 0,
  orbitPhaseOffset = 0,
): { position: Vec3; rotationY: number } {
  const orbitAngle = computeOrbitAngle(elapsedDays, orbitalPeriodDays, orbitPhaseOffset)
  return {
    position: getCircularOrbitPosition(orbitRadius, orbitAngle, inclinationDeg),
    rotationY: computeRotation(elapsedDays, rotationPeriodDays),
  }
}
