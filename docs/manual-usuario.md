# Manual de usuario

## Vista general

La aplicacion muestra un modelo 3D del Sistema Solar con panel educativo lateral y controles sobre el canvas.

## Navegacion de camara

- **Vista sistema**: aleja la camara para ver todo el sistema.
- **Modo libre**: orbita y zoom con el raton (arrastrar, rueda). El HUD indica *Modo libre activo*.
- **Seguir planeta**: centra la camara en el planeta elegido en **Viajar a** o al hacer clic en un planeta. El HUD muestra *Siguiendo [planeta]* en verde.
- **Modo libre** (boton o opcion en desplegable): deja de seguir el planeta; la camara queda donde esta.

## Simulacion de tiempo

| Control | Funcion |
|---------|---------|
| **Play** | Reanuda el avance orbital |
| **Pausa** | Detiene el movimiento |
| **Tiempo Real** | Ancla posiciones a la fecha/hora actuales |
| **x1** | Velocidad real (1 dia simulado = 1 dia real) |
| **x100k / x1M / x10M / x100M** | Multiplicadores sobre x1 o sobre la fecha anclada |
| **Orbitas visibles** | Muestra u oculta las trayectorias |
| **Etiquetas** | Nombres sobre los planetas |

### Velocidad

A **x1** el movimiento es casi imperceptible (como en la realidad). Para ver orbitas en pantalla usa **x100k** o superior. Mercurio se aprecia antes que Neptuno.

### Tiempo Real

1. Pulsa **Tiempo Real** — los planetas se alinean con la fecha actual (modelo aproximado).
2. Elige un multiplicador (p. ej. **x1M**) — el tiempo avanza acelerado **desde esa fecha**, sin saltos bruscos.
3. El reloj muestra la fecha simulada avanzando.
4. Vuelve a pulsar **Tiempo Real** para regresar al modo simulado libre.

## Planetas y lunas

- Clic en un planeta: seleccion y ficha en el panel **Planeta**.
- **Luna** orbitando la Tierra.
- **Io** orbitando Jupiter.
- **Cinturon de asteroides** entre las orbitas de Marte y Jupiter.

## Panel educativo

Pestanas: **Sistema**, **Planeta**, **Modelo**, **Fisica**. En modo profesor, el panel muestra el paso guiado de la leccion.

## Modo profesor

Desde el boton superior del canvas, **Iniciar modo profesor** recorre 12 pasos con camara, tiempo y contenido predefinidos. **Anterior / Siguiente / Salir** controlan la presentacion.

## Atajos mentales

| Quiero… | Hacer… |
|---------|--------|
| Ver todo el sistema | Vista sistema |
| Acercarme a Marte | Viajar a → Marte |
| Explorar sin seguir | Modo libre |
| Ver movimiento hoy | Tiempo Real + x1M |
| Pausar una leccion | Pausa |
