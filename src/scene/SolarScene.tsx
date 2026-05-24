import { PLANETS } from '../data/planets'
import { getPlanetOrbitRadiusById } from '../data/scales'
import { MOONS } from '../data/moons'
import { SimulationClock } from '../hooks/useSimulationClock'
import { useAppStore } from '../store/useAppStore'
import { AsteroidBelt } from './AsteroidBelt'
import { Moon } from './Moon'
import { OrbitPath } from './OrbitPath'
import { Planet } from './Planet'
import { PostEffects } from './PostEffects'
import { SolarSystemGroup } from './SolarSystemGroup'
import { SpaceSkybox } from './SpaceSkybox'
import { Starfield } from './Starfield'
import { Sun } from './Sun'

export function SolarScene() {
  const showOrbits = useAppStore((s) => s.showOrbits)
  const helicalMotion = useAppStore((s) => s.helicalMotion)

  return (
    <>
      <color attach="background" args={['#020010']} />
      <ambientLight intensity={0.04} color="#0a0c18" />
      <SimulationClock />

      <SpaceSkybox />
      <Starfield />

      <SolarSystemGroup>
        <Sun />

        {PLANETS.map((planet) => (
          <group key={planet.id}>
            {showOrbits && !helicalMotion && (
              <OrbitPath
                radius={getPlanetOrbitRadiusById(planet.id)}
                color={planet.orbitColor}
                inclinationDeg={planet.inclinationDeg}
                ascendingNodeDeg={planet.ascendingNodeDeg}
              />
            )}
            <Planet data={planet} />
          </group>
        ))}

        <AsteroidBelt />

        {MOONS.map((moon) => (
          <Moon key={moon.id} data={moon} />
        ))}
      </SolarSystemGroup>

      <PostEffects />
    </>
  )
}
