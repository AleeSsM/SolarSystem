# Escalas del modelo

El Sistema Solar real no puede mostrarse a escala simultanea en distancia y tamano.

## Distancias (UA → escena)

Formula en `data/scales.ts`:

```
orbitRadius = 12 + AU^0.65 × 10
```

| Planeta | UA real | Radio orbital (escena) |
|---------|---------|------------------------|
| Mercurio | 0.39 | ~17 |
| Tierra | 1.0 | 22 |
| Marte | 1.52 | ~25 |
| Jupiter | 5.2 | ~42 |
| Neptuno | 30.1 | ~124 |

Compresion potencial (exponente 0.65): Neptuno queda visible sin perder separacion interior.

## Tamanos planetarios

Exagerados respecto a distancia. Tierra = 0.55 unidades. Jupiter ~11× mas grande que Tierra en la realidad, aqui ~2.5× visual para que se distinga desde lejos.

## Tiempo

- **x1** = velocidad real: 1 dia simulado = 1 dia real (86 400 s)
- **x100k / x1M / x10M / x100M** = multiplicadores sobre esa base
- Tierra completa una orbita en ~365 dias simulados a x1
- Mercurio (~88 dias) orbita ~4× mas rapido que la Tierra; Neptuno (~60 189 dias) mucho mas lento — usa x1M o x10M para apreciar su movimiento
- **Tiempo Real** (boton dedicado): alinea posiciones con la fecha/hora actual del sistema

## Velocidades orbitales

Los periodos son datos NASA reales. La velocidad angular es `2π / periodo`, por eso Mercurio se mueve mucho mas rapido que Jupiter.

## Lunas

| Luna | Padre | Radio (escena) | Orbita local | Periodo |
|------|-------|----------------|--------------|---------|
| Luna | Tierra | 0.15 | 1.2 | 27.32 dias |
| Io | Jupiter | 0.22 | 2.2 | 1.77 dias |

Radios y distancias locales exagerados para visibilidad desde la camara general.

## Cinturon de asteroides

Entre 2.2 y 3.2 UA reales (~28–35 unidades de escena tras compresion). ~350 instancias con `InstancedMesh`; tamanos 0.04–0.12 unidades.

## Modo Tiempo Real

Cuando esta activo, el tiempo simulado = dias desde J2000.0 hasta ahora. Ver `docs/modelo-fisico.md`.

## Texturas

Planetas: Stellarium (CC). Sol: Solar System Scope via homer-jay/solar-system-textures (CC BY 4.0). Tierra: three.js examples.
