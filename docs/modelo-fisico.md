# Modelo físico

Supuestos y limitaciones de la simulación.

## Orbitas

Trayectorias **circulares** (no elípticas) con inclinación configurable por planeta:

```
θ = (t / T) × 2π + φ
```

- `t` — días simulados transcurridos  
- `T` — periodo orbital del cuerpo  
- `φ` — fase inicial  

Los periodos provienen de tablas públicas (NASA/JPL).

## Tiempo

| Modo | Comportamiento |
|------|----------------|
| x1 | 1 día simulado = 1 día real |
| x100k … x1000M | Multiplicador sobre el reloj base |
| Tiempo Real | Ancla a la fecha actual del sistema |

En Tiempo Real las posiciones son **aproximadas** (órbitas circulares, fases simplificadas). Adecuado para visualización, no para ephemerides de precisión.

## Escala espacial

Distancia orbital y radio de cuerpos usan curvas distintas (ver `docs/escalas.md`). No es posible representar simultáneamente:

1. Distancias reales en UA  
2. Diámetros reales en km  
3. Visibilidad cómoda en pantalla  

El proyecto prioriza (3) manteniendo orden orbital y periodos correctos.

## Lunas y asteroides

- **Luna e Io:** órbita circular local alrededor del planeta padre  
- **Asteroides:** `InstancedMesh` entre 2.15 y 3.25 UA; periodos `T ∝ AU^1.5`

## Iluminación

Luz puntual en el Sol. La barra **Brillo planetas** aclara la hemisferio no iluminado mediante shader personalizado, sin alterar la intensidad de la luz solar.

## Modo helicoidal

El sistema avanza en línea recta mientras los planetas mantienen movimiento orbital en el plano XY, generando estelas helicoidales para visualizar el movimiento compuesto.
