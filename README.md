# Sistema Solar 3D Interactivo

Simulador educativo del Sistema Solar en 3D con navegacion libre, datos cientificos (NASA), simulacion orbital, modo profesor y alineacion con la fecha real. Proyecto de nivel tesis.

## Demo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

> Abre como raiz del workspace la carpeta **`SolarSystem\SolarSystem`** (donde esta este `package.json`), no la carpeta padre del repositorio.

## Stack

| Capa | Tecnologia |
|------|------------|
| Build | Vite + TypeScript |
| UI | React |
| 3D | Three.js, React Three Fiber, Drei |
| Postproceso | `@react-three/postprocessing` |
| Estado | Zustand |

## Funcionalidades

- **8 planetas** con texturas, rotacion y orbitas relativas correctas
- **Luna** (Tierra) e **Io** (Jupiter) en orbita local
- **Cinturon de asteroides** entre Marte y Jupiter
- **Camara libre** y modo **seguir planeta** con transiciones suaves
- **Click / hover** en planetas con ficha educativa en panel lateral
- **HUD de tiempo**: pausa, play, **Tiempo Real**, velocidades x1 · x100k · x1M · x10M · x100M
- **Modo profesor**: 12 pasos guiados con camara y guion sincronizados
- Efectos visuales: skybox, bloom solar, anillos de Saturno, estrellas con parallax

## Controles rapidos

| Accion | Como |
|--------|------|
| Orbitar camara | Arrastrar raton |
| Zoom | Rueda |
| Seleccionar planeta | Click en el planeta |
| Seguir planeta | Menu **Viajar a** o click en planeta |
| Modo libre | Boton **Modo libre** o opcion en el desplegable |
| Ver movimiento orbital | x100k o superior (x1 = tiempo real) |
| Posiciones de hoy | **Tiempo Real** + multiplicador |

## Arquitectura

```
src/
├── data/           Planetas, lunas, escalas, contenido educativo
├── simulation/     Orbitas, reloj, Tiempo Real (sin Three.js)
├── scene/          Meshes, luces, efectos, asteroides
├── camera/         OrbitControls, seguimiento, transiciones
├── ui/             Layout, HUD, panel educativo, modo profesor
├── hooks/          Reloj simulado
└── store/          Zustand (camara, tiempo, seleccion, profesor)
```

La simulacion **no importa Three.js**: solo devuelve posiciones y angulos; la escena los aplica.

## Documentacion (tesis)

| Documento | Contenido |
|-----------|-----------|
| [docs/arquitectura.md](docs/arquitectura.md) | Capas, flujo de datos, archivos clave |
| [docs/modelo-fisico.md](docs/modelo-fisico.md) | Orbitas, tiempo, Tiempo Real, limitaciones |
| [docs/escalas.md](docs/escalas.md) | Formulas de distancia y tamano |
| [docs/manual-usuario.md](docs/manual-usuario.md) | Guia de uso completa |
| [PLAN-PASOS.txt](PLAN-PASOS.txt) | Roadmap de desarrollo por fases |

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de produccion
npm run preview  # Previsualizar build
```

## Progreso del proyecto

| Fase | Estado |
|------|--------|
| 0 — Fundacion | Completada |
| 1 — Sol + Tierra | Completada |
| 2 — 8 planetas | Completada |
| 3 — Camara | Completada |
| 4 — Interaccion | Completada |
| 5 — HUD tiempo | Completada |
| 6 — UI educativa | Completada |
| 7 — Pulido visual | Completada |
| 8 — Modo profesor | Completada |
| 9 — Extras (lunas, asteroides) | Completada |
| 10 — Documentacion tesis | Completada |

## Licencia y creditos

Texturas planetarias: Stellarium (CC). Sol: Solar System Scope via [homer-jay/solar-system-textures](https://github.com/homer-jay/solar-system-textures) (CC BY 4.0). Luna: three.js examples.

Datos orbitales: periodos y distancias basados en referencias NASA/JPL (modelo simplificado circular).
