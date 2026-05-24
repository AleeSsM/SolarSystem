# Como esta armado el repo

Notas rapidas para quien quiera tocar el codigo.

## Carpetas

| Carpeta | Para que sirve |
|---------|----------------|
| `data/` | Planetas, lunas, textos del panel, pasos del tour |
| `simulation/` | Orbitas y reloj (sin Three.js) |
| `scene/` | Meshes, luces, efectos |
| `camera/` | OrbitControls y seguir planetas |
| `ui/` | HUD, sidebar, tour guiado |
| `store/` | Zustand (estado global) |

## Flujo del tiempo → posicion

```
SimulationClock
  → elapsedDays
  → simulation/orbit.ts
  → posicion + rotacion
  → Planet.tsx / Moon.tsx
```

La simulacion no importa Three.js; solo devuelve numeros.

## Archivos que mas vas a tocar

- `data/planets.ts` — datos de planetas
- `simulation/orbit.ts` — matematica orbital
- `simulation/realTime.ts` — modo Tiempo Real
- `hooks/useSimulationClock.ts` — reloj
- `scene/usePlanetSurfaceMaterial.ts` — barra de brillo (cara oscura)
- `store/useAppStore.ts` — estado de UI y camara
