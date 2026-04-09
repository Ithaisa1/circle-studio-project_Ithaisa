# Circle Studio

Proyecto web multipagina desarrollado con HTML, CSS y JavaScript para presentar los servicios, proyectos y contacto de un estudio digital ficticio llamado Circle Studio.

El proyecto incluye una home responsive, una pagina de proyectos con contenido dinamico desde una API, una pagina de contacto con validacion personalizada, una pagina 404 interactiva, un boton global de scroll hacia arriba y un header reutilizable con menu hamburguesa y efecto sticky al hacer scroll.

## Descripcion general

Este proyecto fue construido como practica de maquetacion web, adaptacion responsive, consumo de datos externos y manipulacion del DOM con JavaScript.

La aplicacion esta dividida en varias vistas:

- `index.html`: pagina principal con hero, clientes, proyectos recientes, testimonial, servicios y newsletter.
- `pages/projects.html`: listado completo de proyectos y vista de detalle segun el `id` recibido por URL.
- `pages/contact.html`: formulario de contacto con validacion visual y mensajes de error personalizados.
- `pages/404.html`: pagina de error con interacciones adicionales.

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- API JSON remota de Ironhack

## Funcionalidades implementadas

### Home

- Hero section con llamadas a la accion.
- Logos de clientes con enlaces externos.
- Proyectos recientes cargados dinamicamente desde la API.
- Seccion de servicios.
- Testimonial destacado.
- Newsletter.
- Header compartido con menu hamburguesa en tablet y mobile.
- Boton flotante para volver arriba.

### Projects

- Consumo de datos desde:
  `https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects`
- Renderizado dinamico del listado de proyectos.
- Vista de detalle usando query params.
- Seccion de otros proyectos debajo del detalle.
- Manejo de proyecto no encontrado con aviso y redireccion a la pagina 404.
- Newsletter visual alineada con la de la home.

Ejemplo:

```text
projects.html?id=1
```

### Contact

- Validacion personalizada con JavaScript.
- Estados visuales por campo:
  - verde cuando el campo es correcto
  - rojo cuando el campo contiene errores
- Mensajes de error visibles debajo de cada input.
- Validacion en tiempo real mientras el usuario escribe.
- Validacion de email con patron.
- Validacion del telefono para permitir solo numeros y simbolos habituales.
- Regla especial para impedir el nombre `ironhack`.

### Pagina 404

- Mensajes aleatorios de humor.
- Mini juego con estrellas y contador de puntos.
- Interaccion con eventos y animaciones visuales.

### Header

- Navegacion comun en las paginas principales.
- Menu hamburguesa para tablet y mobile.
- Animacion del icono de tres lineas a `X`.
- Apertura y cierre suave del panel.
- Cierre al pulsar un enlace, fuera del menu o la tecla `Escape`.
- Header sticky con animacion al hacer scroll.
- Header mas compacto cuando se fija arriba.

### Scroll To Top

- Boton fijo visible al hacer scroll.
- Regreso suave al inicio de la pagina.
- Disponible en `index.html`, `projects.html` y `contact.html`.

### Responsive Design

El proyecto fue adaptado para tres grandes rangos:

- Mobile
- Tablet / laptop
- Desktop

Se ajustaron:

- Header y navegacion
- Hero section
- Grids de proyectos y servicios
- Formularios
- Newsletter
- Vista de detalle de proyectos
- Tipografias y espaciados
- Elementos flotantes como el boton de scroll

## Estructura del proyecto

```text
circle-studio-project_Ithaisa/
|-- assets/
|-- css/
|   |-- 404.css
|   |-- contact.css
|   |-- global.css
|   |-- home.css
|   `-- projects.css
|-- js/
|   |-- 404.js
|   |-- contact.js
|   |-- header.js
|   |-- projects.js
|   `-- scroll-top.js
|-- pages/
|   |-- 404.html
|   |-- contact.html
|   `-- projects.html
|-- index.html
`-- README.md
```

## Documentacion del codigo

### HTML

#### `index.html`

- Define la home del proyecto.
- Incluye el header comun, el hero, proyectos recientes, testimonial, servicios, newsletter y footer.
- El contenedor `#projects-container` se rellena desde JavaScript con los 3 primeros proyectos de la API.

#### `pages/projects.html`

- Muestra el listado completo de proyectos o el detalle de un proyecto concreto.
- Incluye el contenedor `#project-detail` para la vista individual.
- Incluye el titulo `Other Projects` y el contenedor `#projects-list` para mostrar proyectos relacionados.

#### `pages/contact.html`

- Contiene el formulario de contacto.
- Usa el mismo header y footer compartidos que el resto de paginas principales.

#### `pages/404.html`

- Contiene la pagina de error personalizada.
- Usa `404.js` para los chistes aleatorios y el minijuego de estrellas.

### CSS

#### `css/global.css`

Archivo base del proyecto. Aqui se centralizan:

- Variables globales.
- Tipografias fluidas con `clamp()`.
- Estilos del header compartido.
- Estados del header sticky.
- Estilos del menu hamburguesa.
- Estilos del boton scroll top.
- Ajustes responsive globales.

#### `css/home.css`

- Estilos especificos de la home.
- Layout del hero.
- Tarjetas de proyectos recientes.
- Secciones de servicios, testimonial y newsletter.
- Reglas responsive para mobile, tablet y desktop.

#### `css/contact.css`

- Estilos del formulario de contacto.
- Layout de columnas para desktop y una columna en mobile.
- Espaciados, textarea y ajustes responsive.

#### `css/projects.css`

- Estilos del listado de proyectos.
- Estilos del detalle de proyecto.
- Ajustes para que el contenido largo no deforme la tarjeta del detalle.
- Estilos de `Other Projects`.
- Newsletter alineada visualmente con la de la home.

#### `css/404.css`

- Estilos exclusivos de la pagina 404.
- Fondo, caja principal, estrellas, botones y juego.

### JavaScript

#### `js/projects.js`

Responsabilidad:

- Obtener datos desde la API.
- Cargar los 3 primeros proyectos en la home.
- Renderizar el listado completo en la pagina de proyectos.
- Renderizar el detalle de un proyecto concreto.
- Mostrar otros proyectos en la vista de detalle.

Logica principal:

- `window.onload` inicia la carga.
- `fetch(API_URL)` obtiene los proyectos.
- `renderHomeProjects()` pinta los 3 primeros proyectos.
- `renderProjectsPage()` decide si mostrar listado o detalle segun el `id`.
- `renderProjectDetail()` rellena imagen, titulo, descripcion y metadatos.
- `createProjectCard()` reutiliza el HTML de cada card.

#### `js/contact.js`

Responsabilidad:

- Validar el formulario de contacto.
- Mostrar mensajes de error.
- Marcar cada campo segun su estado.

Funciones principales:

- `validateName()`
- `validateEmail()`
- `validatePhone()`
- `validateMessage()`
- `showError(input, message)`
- `showSuccess(input)`
- `removeError(input)`
- `clearErrors()`

Eventos usados:

- `submit` para validar el formulario completo.
- `input` para validar en tiempo real.

#### `js/header.js`

Responsabilidad:

- Controlar todo el comportamiento del header compartido.

Incluye dos bloques principales:

- Sticky header:
  - detecta el scroll
  - anade o quita la clase `is-sticky`
  - activa la animacion visual del header fijo

- Menu hamburguesa:
  - controla apertura y cierre del panel
  - actualiza `aria-expanded` y `aria-label`
  - cierra el menu al navegar, al clicar fuera o al pulsar `Escape`
  - resetea el estado al volver a desktop

#### `js/scroll-top.js`

Responsabilidad:

- Controlar el boton flotante para volver al inicio.

Logica principal:

- Busca `#scroll-top-btn`.
- Muestra el boton cuando `window.scrollY > 300`.
- Lo oculta al volver arriba.
- Ejecuta scroll suave con `window.scrollTo({ top: 0, behavior: "smooth" })`.

#### `js/404.js`

Responsabilidad:

- Gestionar las interacciones de la pagina 404.

Funciones principales:

- `showFunFact()`
- `addStarPoints(event)`

Eventos usados:

- `click` en el boton de chistes.
- `click` en cada estrella del minijuego.

## Breakpoints trabajados

Los estilos se organizaron pensando en estos cortes principales:

- `max-width: 767px` para mobile
- `max-width: 991px` para tablet y navegacion hamburguesa
- `min-width: 768px` para tablet en adelante
- `min-width: 992px` para desktop
- Ajustes especificos entre `768px` y `1199px` o `1024px` segun la seccion

## Como ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Abre la carpeta del proyecto en tu editor.
3. Ejecuta la web con Live Server o abre `index.html` en el navegador.



## Mejoras futuras posibles

- Mover los estilos inline de validacion a clases CSS.
- Mejorar aun mas la accesibilidad del formulario.
- Anadir estados focus mas elaborados para navegacion por teclado.
- Incorporar filtros o busqueda en la pagina de proyectos.
- Corregir pequenos detalles de contenido y textos.
- Publicar una demo definitiva en Netlify.

## Autoria

Proyecto desarrollado por Ithaisa.
