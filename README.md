# Sistema Solar 3D

Simulación interactiva del Sistema Solar construida con React, Three.js y React Three Fiber. El proyecto explora órbitas, escalas visuales y control temporal en el navegador, con una interfaz pensada para exploración libre y consulta de datos.

**Demo:** [GitHub Pages](https://aleessm.github.io/SolarSystem/)

## Características

- Ocho planetas con texturas, rotación y órbitas basadas en periodos reales
- Luna terrestre e Io (Júpiter) como satélites
- Cinturón de asteroides entre Marte y Júpiter
- Cámara libre o seguimiento de planetas con transiciones cinematográficas
- Control temporal: pausa, multiplicadores (x100k–x1000M) y modo Tiempo Real
- Tour guiado de 12 paradas
- Modo helicoidal con estelas de movimiento
- Panel informativo con datos por planeta y notas del modelo

## Inicio rápido

```bash
npm install
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173).

> El repositorio clonable incluye la carpeta anidada `SolarSystem/SolarSystem`, donde está el `package.json`.

## Stack

| Tecnología | Uso |
|------------|-----|
| Vite + TypeScript | Build y tipado |
| React 19 | Interfaz |
| Three.js + R3F + Drei | Render 3D |
| Zustand | Estado global |
| Postprocessing | Efectos visuales |

## Escala del modelo

El modelo **no** es astronómicamente exacto en distancia y tamaño a la vez. Usa una escala única equilibrada:

- **Distancias:** `orbitRadius = 14 + AU^0.8 × 9.2` (compresión potencial)
- **Tamaños:** ratios lineales NASA respecto a la Tierra (0.38 u de referencia)
- **Sol:** radio acotado para no tapar las órbitas interiores

Los periodos orbitales sí provienen de datos reales. Ver [docs/escalas.md](docs/escalas.md) para el detalle.

## Documentación

- [docs/manual-usuario.md](docs/manual-usuario.md) — controles e interfaz
- [docs/arquitectura.md](docs/arquitectura.md) — organización del código
- [docs/modelo-fisico.md](docs/modelo-fisico.md) — supuestos físicos
- [docs/escalas.md](docs/escalas.md) — fórmulas de escala

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run preview  # vista previa del build
npm run lint     # ESLint
```

## Créditos

- Texturas planetarias: [Stellarium](https://stellarium.org/) (CC)
- Textura del Sol: [homer-jay/solar-system-textures](https://github.com/homer-jay/solar-system-textures) (CC BY 4.0)
- Textura de la Tierra: ejemplos de three.js
- Periodos orbitales: tablas públicas NASA/JPL (órbitas simplificadas a circulares)

## Licencia

Código del proyecto bajo la licencia del repositorio. Las texturas conservan sus licencias originales.
