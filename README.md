# Sistema Solar 3D

Un side project en el que anduve metiendo planetas, orbitas y controles raros de tiempo. Nada fancy: abres la pagina, te mueves por el espacio y le picas a lo que quieras.

## Probarlo en local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

> La carpeta correcta es **`SolarSystem\SolarSystem`** (donde esta el `package.json`).

## Que hay

- 8 planetas con texturas, rotacion y orbitas que respetan periodos reales (mas o menos)
- Luna e Io orbitando a su planeta
- Cinturon de asteroides entre Marte y Jupiter
- Camara libre o siguiendo un planeta
- Click en planetas para ver datos en el panel
- Tiempo Real + velocidades locas (x100k hasta x100M)
- Tour guiado de 12 pasos si no quieres perderte
- Brillo ajustable en la cara oscura de los planetas

## Controles rapidos

| Quiero… | Hago… |
|---------|--------|
| Mover la camara | Arrastrar |
| Zoom | Rueda |
| Ir a un planeta | Click o **Viajar a** |
| Ver orbitas moverse | x100k o mas |
| Posiciones de hoy | **Tiempo Real** + multiplicador |

## Stack

Vite, React, TypeScript, Three.js, React Three Fiber, Zustand.

## Docs (por si curioseas el codigo)

- [docs/manual-usuario.md](docs/manual-usuario.md) — como usar la pagina
- [docs/arquitectura.md](docs/arquitectura.md) — como esta organizado el repo
- [docs/modelo-fisico.md](docs/modelo-fisico.md) — que tan real es el modelo
- [docs/escalas.md](docs/escalas.md) — formulas de distancias y tamanos

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Creditos

Texturas: Stellarium (CC), Sol via [homer-jay/solar-system-textures](https://github.com/homer-jay/solar-system-textures), Luna de three.js examples. Periodos orbitales sacados de tablas publicas (NASA/JPL), simplificados a circulos.
