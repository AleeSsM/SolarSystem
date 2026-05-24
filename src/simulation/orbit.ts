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

/**
 * Posición en coordenadas de escena (plano eclíptico XZ, norte eclíptico +Y).
 * Inclinación I y nodo ascendente Ω respecto al equinoccio (J2000, valores NASA/JPL).
 */
export function getCircularOrbitPosition(
  orbitRadius: number,
  angle: number,
  inclinationDeg = 0,
  ascendingNodeDeg = 0,
): Vec3 {
  const inc = (inclinationDeg * Math.PI) / 180
  const node = (ascendingNodeDeg * Math.PI) / 180
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const x1 = orbitRadius * c
  const y1 = orbitRadius * s * Math.sin(inc)
  const z1 = orbitRadius * s * Math.cos(inc)
  const cosN = Math.cos(node)
  const sinN = Math.sin(node)
  const x = x1 * cosN + z1 * sinN
  const y = y1
  const z = -x1 * sinN + z1 * cosN
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
  ascendingNodeDeg = 0,
): { position: Vec3; rotationY: number } {
  const orbitAngle = computeOrbitAngle(elapsedDays, orbitalPeriodDays, orbitPhaseOffset)
  return {
    position: getCircularOrbitPosition(
      orbitRadius,
      orbitAngle,
      inclinationDeg,
      ascendingNodeDeg,
    ),
    rotationY: computeRotation(elapsedDays, rotationPeriodDays),
  }
}
