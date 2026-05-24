import type { ReactNode } from 'react'

/** Contenedor estatico; la deriva helicoidal es solo visual (estelas). */
export function SolarSystemGroup({ children }: { children: ReactNode }) {
  return <group name="solar-system">{children}</group>
}
