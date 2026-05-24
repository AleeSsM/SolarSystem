<div align="center">

<h1>Sistema Solar 3D</h1>

<p>
  <a href="https://www.ipn.mx/"><img src="https://img.shields.io/badge/IPN-Instituto_Politécnico_Nacional-7B1E1E?style=for-the-badge&labelColor=1a1a2e" alt="Instituto Politécnico Nacional"/></a>
  <a href="https://aleessm.github.io/SolarSystem/"><img src="https://img.shields.io/badge/Demo-GitHub_Pages-3d6cff?style=for-the-badge&labelColor=0d1117" alt="Demo en GitHub Pages"/></a>
  <img src="https://img.shields.io/badge/WebGL-3D-0d1117?style=for-the-badge&labelColor=1f2937" alt="WebGL 3D"/>
</p>

<p>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61dafb" alt="React"/>
  <img src="https://img.shields.io/badge/Three.js-000?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js"/>
  <img src="https://img.shields.io/badge/R3F-ffffff?style=flat-square&logo=react&logoColor=61dafb" alt="React Three Fiber"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Zustand-764ABC?style=flat-square" alt="Zustand"/>
</p>

<p><strong>Exploración 3D del Sistema Solar en el navegador</strong></p>
<p><em>Órbitas reales · escala pedagógica · cámara libre · tiempo acelerado</em></p>
<p>
  <a href="https://aleessm.github.io/SolarSystem/"><strong>Abrir simulación</strong></a>
  ·
  <a href="docs/manual-usuario.md">Documentación</a>
  ·
  <a href="https://github.com/AleeSsM/SolarSystem">Código fuente</a>
</p>

</div>

---

## Instituto Politécnico Nacional

<table>
<tr>
<td width="120" align="center"><strong>IPN</strong><br/><sub>México</sub></td>
<td>

Proyecto de **exploración espacial interactiva** desarrollado en el marco académico del [Instituto Politécnico Nacional](https://www.ipn.mx/).

*La técnica al servicio de la patria* — aplicada aquí como divulgación científica accesible: visualizar órbitas, escalas y movimiento planetario sin salir del navegador.

</td>
</tr>
</table>

---

## Vista general

| | |
|:---|:---|
| **Qué hace** | Simula los 8 planetas, la Luna, Io y el cinturón de asteroides con texturas, iluminación y control temporal |
| **Para quién** | Curiosos del espacio, estudiantes y quien quiera *sentir* las órbitas antes de meterse en efemérides |
| **Qué no es** | Un planetario profesional ni un modelo NASA al milímetro en distancia **y** tamaño a la vez |

<details>
<summary><strong>Terminal — especificaciones del módulo</strong></summary>

<br/>

```bash
$ solar-system --status

  [core]     helioframe .............. OK
  [render]   webgl2 · r3f · drei ...... OK
  [data]     J2000 inclinations ....... OK
  [ui]       es-MX locale ............. OK
  [ipn]      attribution .............. linked

  orbit_radius = 14 + AU^0.8 * 9.2
  period       = NASA/JPL (circular)
```

</details>

---

## Características principales

<p align="center">
  <code>planetas</code> · <code>órbitas</code> · <code>tiempo</code> · <code>cámara</code> · <code>tour</code> · <code>hélice</code>
</p>

- **Sistema completo** — Mercurio a Neptuno, satélites, Sol con corona y cinturón de asteroides
- **Órbitas físicas** — periodos reales; inclinación y nodo ascendente (J2000)
- **Tiempo** — pausa, `x1` … `x1000M`, modo **Tiempo Real** anclado a la fecha actual
- **Cámara** — vista sistema, modo libre, seguimiento de planeta, viajes cinematográficos
- **Modo helicoidal** — estelas que muestran el paso del tiempo (sin círculos de órbita)
- **Educación** — ficha por planeta, «Hoy en el cielo», tabla *distancia real vs escena*
- **Extras** — tour de 12 paradas, música ambiente, modo rendimiento, atajos de teclado

### Atajos

| Tecla | Acción |
|:------|:-------|
| `Espacio` | Pausa / reproducir |
| `R` | Vista sistema |
| `H` | Movimiento helicoidal |
| `M` | Música |
| `P` | Modo rendimiento |
| `?` | Atajos on/off |

**URL:** `?planet=mars` · `?sound=0` · `?performance=1`

---

## Inicio rápido

```bash
npm install
npm run dev
```

→ [http://localhost:5173](http://localhost:5173)

> El `package.json` está en `SolarSystem/SolarSystem/` si clonas el repositorio completo.

```bash
npm run build    # despliegue (GitHub Pages)
npm run preview
npm run lint
```

---

## Stack técnico

| Capa | Herramienta |
|:-----|:------------|
| Build | Vite + TypeScript |
| UI | React 19 |
| 3D | Three.js · React Three Fiber · Drei |
| Estado | Zustand |
| Post | Bloom (postprocessing) |

---

## Documentación

| Archivo | Contenido |
|:--------|:----------|
| [manual-usuario.md](docs/manual-usuario.md) | Controles e interfaz |
| [arquitectura.md](docs/arquitectura.md) | Estructura del código |
| [modelo-fisico.md](docs/modelo-fisico.md) | Supuestos del modelo |
| [escalas.md](docs/escalas.md) | Fórmulas de escala |

---

## Créditos

| Recurso | Origen |
|:--------|:-------|
| Texturas planetarias | [Stellarium](https://stellarium.org/) |
| Sol | [solar-system-textures](https://github.com/homer-jay/solar-system-textures) (CC BY 4.0) |
| Periodos / inclinaciones | NASA · JPL |
| Música | *Interstellar* — uso personal / educativo |

---

<p align="center">

<sub>

**Instituto Politécnico Nacional** · Proyecto personal · 2026

<br/>

[ipn.mx](https://www.ipn.mx/) · [Demo](https://aleessm.github.io/SolarSystem/)

</sub>

</p>
