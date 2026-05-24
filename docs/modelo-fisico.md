# Modelo fisico

## Orbitas planetarias

Cada planeta sigue una **orbita circular** en el plano ecuatorial, con inclinacion opcional (`inclinationDeg`). El angulo orbital es:

```
θ = (t / T) × 2π + φ
```

- `t`: dias transcurridos desde la epoca de referencia
- `T`: periodo orbital en dias (datos NASA)
- `φ`: fase inicial (desfase visual o longitud media en Tiempo Real)

La posicion se obtiene con `getCircularOrbitPosition()` en `simulation/orbit.ts`.

## Rotacion

La rotacion propia es proporcional al tiempo simulado: una vuelta completa cada `rotationPeriodDays`.

## Modo simulado (por defecto)

- El reloj avanza con `timeScale` (×1 = real, ×100k, ×1M, ×10M, ×100M).
- Los planetas usan desfases fijos (`ORBIT_PHASE_OFFSET`) para que no arranquen alineados.
- **×1**: 1 dia simulado = 1 dia real (`SECONDS_PER_SIM_DAY = 86400`).

## Modo Tiempo Real

Activa el boton **Tiempo Real** en el HUD de simulacion.

- Ancla las posiciones a la **fecha y hora actuales**.
- Los multiplicadores (×100k … ×100M) aceleran el avance **desde esa fecha**, no desde cero.
- El reloj muestra la fecha simulada avanzando (con multiplicador activo, corre mas rapido).
- **Pausa** congela; **Play** reanuda desde ese instante.

### Limitaciones

Este modo es **educativo y aproximado**, no un efemeride JPL:

- Orbitas circulares (no elipticas).
- Sin perturbaciones ni inclinaciones reales completas.
- Longitudes medias simplificadas; la alineacion es cualitativa, no astronomica de precision.

Para observacion profesional se requeririan efemerides (p. ej. VSOP87 / JPL Horizons).

## Lunas

- **Luna**: orbita local alrededor de la Tierra (periodo ~27.3 dias).
- **Io**: orbita local alrededor de Jupiter (periodo ~1.77 dias).

La posicion de la luna = posicion heliocentrica del planeta padre + offset en orbita local.

## Cinturon de asteroides

Instanced mesh (`scene/AsteroidBelt.tsx`) entre ~2.2 y ~3.2 UA reales, comprimido con la misma escala de distancias. Rotacion lenta independiente por instancia.

## Separacion simulacion / render

`simulation/` no importa Three.js. Solo devuelve numeros; la escena los aplica a meshes.
