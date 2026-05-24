# Arquitectura del proyecto

## Capas

1. **Datos** (`src/data/`) — Planetas, lunas, escalas, textos educativos, modo profesor.
2. **Simulacion** (`src/simulation/`) — Orbitas, rotacion, reloj simulado y Tiempo Real.
3. **Escena** (`src/scene/`) — Three.js / R3F: meshes, luces, efectos, cinturon de asteroides.
4. **Camara** (`src/camera/`) — Modos de navegacion y posicion de planetas.
5. **UI** (`src/ui/`) — Paneles laterales, HUD, modo profesor.
6. **Store** (`src/store/`) — Estado global (Zustand).

## Flujo de datos

```
SimulationClock (useFrame)
       ↓
elapsedDays (ref global)
       ├─ simulado: += delta × timeScale / 86400
       └─ Tiempo Real: ancla J2000 + reloj × timeScale
       ↓
simulation/orbit.ts → computeBodyState()
       ↓
position + rotationY
       ↓
scene/Planet.tsx | Moon.tsx → mesh.position / mesh.rotation
```

La simulacion **no importa Three.js**. Solo devuelve numeros.

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `data/planets.ts` | 8 planetas + periodos NASA |
| `data/moons.ts` | Luna e Io |
| `data/scales.ts` | Compresion UA y tamanos |
| `simulation/orbit.ts` | Orbita circular y rotacion |
| `simulation/realTime.ts` | J2000, longitudes medias, Tiempo Real |
| `simulation/timeControls.ts` | Opciones x1, x100k, x1M, x10M, x100M |
| `hooks/useSimulationClock.ts` | Reloj simulado / ancla Tiempo Real |
| `scene/AsteroidBelt.tsx` | Cinturon instanciado |
| `scene/Moon.tsx` | Luna orbitando planeta padre |
| `camera/CameraRig.tsx` | OrbitControls + seguimiento |
| `store/useAppStore.ts` | `timeMode`, camara, profesor |

## Estado global (Zustand)

| Campo | Uso |
|-------|-----|
| `cameraMode` | `free` \| `follow` |
| `followPlanetId` | Planeta seguido |
| `timeMode` | `simulated` \| `realTime` |
| `timeScale` | 1, 100000, 1e6, 1e7, 1e8 |
| `isPaused` | Congela reloj |
| `phase` | `explore` \| `teacher` |
| `teacherStepIndex` | Paso del modo profesor (0–11) |

## Fases completadas

Todas las fases del plan (0–10) estan implementadas. Ver `PLAN-PASOS.txt` y `README.md`.
