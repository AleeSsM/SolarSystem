# Escalas del modelo

El Sistema Solar real no puede mostrarse a escala simultánea en **distancia** y **tamaño** dentro de una ventana de navegador. Este proyecto usa una **escala única equilibrada**: distancias comprimidas, planetas visibles y un Sol acotado.

Implementación: `src/data/scales.ts`.

## Distancias (UA → escena)

```
orbitRadius = 14 + AU^0.8 × 9.2
```

| Planeta | UA | Radio orbital (u) |
|---------|-----|-------------------|
| Mercurio | 0.387 | ~18.0 |
| Venus | 0.723 | ~20.7 |
| Tierra | 1.000 | ~23.2 |
| Marte | 1.524 | ~26.8 |
| Júpiter | 5.204 | ~51.3 |
| Saturno | 9.583 | ~72.4 |
| Urano | 19.201 | ~107.8 |
| Neptuno | 30.047 | ~138.2 |

El exponente `0.8` comprime el espacio exterior para que Neptuno siga siendo visible sin perder el orden Mercurio → Neptuno.

## Tamaños planetarios

Referencia: Tierra = `EARTH_SCENE_RADIUS` (0.38 u).

Los demás planetas usan ratios lineales respecto a la Tierra (datos NASA):

| Planeta | Ratio vs Tierra | Radio (u) |
|---------|-----------------|-----------|
| Mercurio | 0.383 | ~0.15 |
| Venus | 0.949 | ~0.36 |
| Tierra | 1.000 | 0.38 |
| Marte | 0.532 | ~0.20 |
| Júpiter | 11.21 | ~4.26 |
| Saturno | 9.45 | ~3.59 |
| Urano | 4.01 | ~1.52 |
| Neptuno | 3.88 | ~1.47 |

**Importante:** distancia orbital y radio del planeta se escalan de forma **independiente**. No existe un factor único que convierta UA en unidades de pantalla y también tamaños reales.

## El Sol

```
idealSun = earthRadius × 109.1
orbitCap = mercuryOrbit × 0.36
jupiterFloor = jupiterRadius × 1.14
sunRadius = max(jupiterFloor, min(idealSun, orbitCap)) × SUN_SIZE_BOOST
```

Con `SUN_SIZE_BOOST = 1`, el Sol queda visible pero limitado para no cubrir Mercurio y Venus.

## Tiempo

- **x1** — un día simulado = un día real
- **x100k … x1000M** — multiplicadores sobre esa base
- **Tiempo Real** — ancla posiciones a la fecha/hora del sistema

Velocidad angular: `ω = 2π / periodo`. Mercurio (~88 d) orbita mucho más rápido que Neptuno (~60 189 d).

## Lunas

Radios locales proporcionales al planeta padre (`MOON_TO_PARENT_RATIO`). Órbitas locales exageradas para visibilidad.

## Cinturón de asteroides

Entre 2.15 y 3.25 UA (~28–36 u en escena). Instancias con `InstancedMesh`; periodos según la ley de Kepler simplificada `T ∝ AU^1.5`.

## Texturas

Planetas: Stellarium (CC). Sol: Solar System Scope vía homer-jay/solar-system-textures (CC BY 4.0).
