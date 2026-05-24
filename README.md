```
                         ·    ˚        ✦
              ·                    ·
         ·              ·    ·              ·
    ────────────╮              ╭────────────
                │   ◉ SOL    │
         ○      │  ╱ ╲ ╱ ╲   │      ○
      ──○──     │ ◯   ◯   ◯  │     ──○──
         ○      │  ╲ ╱ ╲ ╱   │      ○
    ────────────╯              ╰────────────
         ·     ◠ ◡ ◠  S I S T E M A     ·
              ·    S O L A R   3 D    ·
                         ·    ˚

      ╔══════════════════════════════════════════╗
      ║  > INICIANDO MÓDULO HELIOCENTRICO...     ║
      ║  > ÓRBITAS: CARGADAS  ·  SHADERS: OK    ║
      ║  > IPN :: WEBGL :: THREE.JS :: REACT     ║
      ╚══════════════════════════════════════════╝
```

# Sistema Solar 3D

> *Más allá del vacío* — exploración interactiva del Sistema Solar en el navegador.

**Demo en vivo:** [**aleessm.github.io/SolarSystem**](https://aleessm.github.io/SolarSystem/)

---

## Instituto Politécnico Nacional

Proyecto personal de exploración espacial desarrollado en el contexto académico del **Instituto Politécnico Nacional (IPN)** — México.

| | |
|---|---|
| **Institución** | [Instituto Politécnico Nacional](https://www.ipn.mx/) |
| **Sitio oficial** | [ipn.mx](https://www.ipn.mx/) |
| **Enfoque** | Visualización 3D, órbitas keplerianas simplificadas y divulgación científica |

```text
    ┌─────────────────────────────────────────┐
    │  IPN  ·  La técnica al servicio        │
    │       de la patria                      │
    └─────────────────────────────────────────┘
```

---

## Qué es esto

Simulación **3D interactiva** del Sistema Solar: ocho planetas, satélites, cinturón de asteroides, control temporal, cámara libre, tour guiado y panel educativo. Construida con **React**, **Three.js** y **React Three Fiber**.

No pretende ser un planetario profesional, sino un **laboratorio visual** para entender órdenes de magnitud, periodos orbitales y el compromiso entre *ver todo* y *ver algo con sentido* en pantalla.

---

## Características

```
  [✓] 8 planetas · texturas · rotación · inclinación J2000
  [✓] Luna + Io · cinturón de asteroides instanciado
  [✓] Cámara libre / seguimiento · viajes cinematográficos
  [✓] Tiempo simulado · Tiempo Real · x1 → x1000M
  [✓] Modo helicoidal · estelas temporales
  [✓] Tour guiado (12 paradas) · panel Info
  [✓] «Hoy en el cielo» · comparar escala real vs escena
  [✓] Música ambiente · modo rendimiento · atajos de teclado
```

| Módulo | Descripción |
|--------|-------------|
| **Órbitas** | Periodos reales; trayectorias circulares con inclinación y nodo ascendente |
| **Escala** | Distancias comprimidas (`14 + AU^0.8 × 9.2`); tamaños exagerados para legibilidad |
| **Helicoidal** | Estelas que envejecen en el tiempo (efecto de hélice galáctica educativa) |
| **Educación** | Pestañas Planeta · Sistema · Detalles · Física |

### Atajos de teclado

```text
  ┌──────────┬─────────────────────────────┐
  │ Espacio  │  Pausa / reproducir         │
  │    R     │  Vista sistema              │
  │    H     │  Movimiento helicoidal      │
  │    M     │  Música                     │
  │    P     │  Modo rendimiento           │
  │    ?     │  Mostrar / ocultar atajos   │
  └──────────┴─────────────────────────────┘
```

### Enlaces profundos (URL)

```text
  ?planet=mars          → enfoque en Marte
  ?sound=0              → música apagada al inicio
  ?performance=1        → modo rendimiento forzado
```

---

## Inicio rápido

```bash
# clonar y entrar al directorio con package.json
npm install
npm run dev
```

Abrir [**http://localhost:5173**](http://localhost:5173)

> Si clonas el repo completo, el código vive en `SolarSystem/SolarSystem/`.

```bash
npm run build     # producción (GitHub Pages)
npm run preview   # vista previa del build
npm run lint      # ESLint
```

---

## Stack

```text
   ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
   │   React 19  │────▶│  Three.js    │────▶│   WebGL2    │
   └─────────────┘     │  R3F · Drei  │     └─────────────┘
          │              └──────────────┘
          ▼
   ┌─────────────┐     ┌──────────────┐
   │   Zustand   │     │ Postprocessing│
   └─────────────┘     └──────────────┘
          │
          ▼
   ┌─────────────┐
   │ Vite + TS   │
   └─────────────┘
```

| Capa | Tecnología |
|------|------------|
| Build | Vite · TypeScript |
| UI | React 19 |
| 3D | Three.js · React Three Fiber · Drei |
| Estado | Zustand |
| Efectos | Postprocessing (bloom) |

---

## Modelo y escala

El universo en pantalla **no** puede ser fiel en distancia y tamaño a la vez. Este proyecto elige una **escala única equilibrada**:

```text
  orbitRadius = 14 + AU^0.8 × 9.2     ← distancias comprimidas
  radio_planeta ∝ ratio NASA/Tierra   ← tamaños legibles
  periodo orbital = dato real         ← velocidades angulares correctas
```

Documentación detallada:

- [docs/manual-usuario.md](docs/manual-usuario.md) — controles e interfaz
- [docs/arquitectura.md](docs/arquitectura.md) — organización del código
- [docs/modelo-fisico.md](docs/modelo-fisico.md) — supuestos físicos
- [docs/escalas.md](docs/escalas.md) — fórmulas de escala

---

## Analytics (opcional)

```bash
cp .env.example .env
# VITE_PLAUSIBLE_DOMAIN=tu-dominio.github.io
```

---

## Créditos y datos

| Recurso | Fuente |
|---------|--------|
| Texturas planetarias | [Stellarium](https://stellarium.org/) (CC) |
| Textura del Sol | [homer-jay/solar-system-textures](https://github.com/homer-jay/solar-system-textures) (CC BY 4.0) |
| Tierra | ejemplos three.js |
| Ephemerides / periodos | NASA · JPL (órbitas circulares simplificadas) |
| Música ambiente | tema *Interstellar* (uso personal / educativo) |

---

## Licencia

Código del repositorio bajo la licencia indicada en el proyecto. Las texturas y assets de terceros conservan sus licencias originales.

---

```text
      ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
         Instituto Politécnico Nacional  ·  2026
              >> FIN DE TRANSMISIÓN <<
      ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
```
