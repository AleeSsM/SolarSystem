# Arquitectura

Organización del repositorio y flujo de datos.

## Estructura

| Carpeta | Responsabilidad |
|---------|-----------------|
| `src/data/` | Planetas, lunas, escalas, contenido educativo |
| `src/simulation/` | Órbitas y reloj (sin dependencia de Three.js) |
| `src/scene/` | Meshes, luces, efectos, cinturón de asteroides |
| `src/camera/` | OrbitControls, seguimiento y secuencias de viaje |
| `src/ui/` | HUD, panel Info, tour, overlays |
| `src/store/` | Estado global (Zustand) |
| `src/hooks/` | Reloj de simulación y tiempo simulado |

## Flujo tiempo → posición

```
SimulationClock
  → elapsedDays
  → simulation/orbit.ts
  → posición + rotación
  → Planet.tsx / Moon.tsx
```

La capa de simulación devuelve coordenadas numéricas; la escena solo las renderiza.

## Escalas

Toda la lógica de distancia y tamaño está centralizada en `src/data/scales.ts`. Los componentes 3D consultan `getPlanetOrbitRadiusById()` y `getPlanetSceneRadiusById()` en lugar de constantes duplicadas.

## Archivos clave

- `data/planets.ts` — catálogo de planetas
- `data/scales.ts` — fórmulas de escena
- `simulation/orbit.ts` — cinemática circular
- `simulation/realTime.ts` — modo Tiempo Real
- `hooks/useSimulationClock.ts` — reloj global
- `store/useAppStore.ts` — UI, cámara, tour
- `scene/usePlanetSurfaceMaterial.ts` — shader de brillo en planetas

## Despliegue

GitHub Pages vía `.github/workflows/deploy-pages.yml`, con `base: '/SolarSystem/'` en Vite.
