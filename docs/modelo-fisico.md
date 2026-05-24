# Que tan real es el modelo

Spoiler: es un dibujo animado con reglas, no un planetario profesional.

## Orbitas

Circulos (no elipses) con inclinacion leve. El angulo avanza asi:

```
θ = (t / T) × 2π + φ
```

`t` = dias simulados, `T` = periodo del planeta, `φ` = fase inicial.

## Tiempo

- **x1** = un dia simulado es un dia real
- **x100k … x100M** = multiplicadores encima de eso
- **Tiempo Real** = ancla a la fecha actual y puedes acelerar desde ahi

Las posiciones en Tiempo Real son aproximadas (orbitas circulares + longitudes medias simplificadas). Se ve bien, pero no sustituye a JPL Horizons.

## Lunas y asteroides

- Luna e Io orbitan a su planeta en un circulo local
- Asteroides: instanced mesh entre ~2.2 y 3.2 UA, comprimidos como el resto

## Brillo planetas

La barra suma luz solo en la cara que no mira al Sol (shader custom). La iluminacion del Sol no se toca.
