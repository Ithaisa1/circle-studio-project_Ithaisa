# Circle Studio

Proyecto web multipagina desarrollado con HTML, CSS y JavaScript para presentar los servicios, proyectos y contacto de un estudio digital ficticio llamado Circle Studio.

El proyecto incluye una home, una pagina de proyectos con contenido dinamico desde una API, una pagina de contacto con validacion personalizada, una pagina 404 interactiva, un boton global de scroll hacia arriba y un menu hamburguesa animado para tablet y mobile.

## Descripcion general

Este proyecto fue construido como practica de maquetacion, organizacion de estilos, consumo de datos externos y manipulacion del DOM con JavaScript.

La aplicacion esta dividida en varias vistas:

- `index.html`: pagina principal con hero, clientes, proyectos recientes, testimonial, servicios y newsletter.
- `pages/projects.html`: listado de proyectos y vista de detalle segun el `id` de la URL.
- `pages/contact.html`: formulario de contacto con validaciones visuales.
- `pages/404.html`: pagina de error personalizada con interacciones adicionales.

## Tecnologias usadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- API JSON remota de Ironhack

## Funcionalidades implementadas

### 1. Home

- Hero section con llamada a la accion.
- Logos de clientes.
- Tarjetas de proyectos recientes cargadas dinamicamente desde la API.
- Seccion de servicios.
- Newsletter.
- Navegacion comun con menu hamburguesa en tablet y mobile.
- Boton flotante para volver arriba.

### 2. Projects

- Consumo de datos desde:
  `https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects`
- Renderizado dinamico del listado de proyectos.
- Vista de detalle usando query params.
- Navegacion entre listado general y detalle.
- Seccion de otros proyectos en la vista de detalle.
- Diseno responsive para mobile, tablet, laptop y desktop.

Ejemplo:

```text
projects.html?id=1
```

### 3. Contact

- Validacion personalizada con JavaScript.
- Estados visuales por campo:
  - verde cuando el campo es correcto
  - rojo cuando el campo contiene errores
- Mensajes de error mostrados fuera del input.
- Validacion en tiempo real mientras la persona escribe.
- Validacion de email con patron.
- Validacion de telefono para aceptar solo numeros y simbolos comunes.
- Regla especial para impedir el nombre `ironhack`.

### 4. Pagina 404

- Mensajes aleatorios de humor.
- Mini juego con estrellas y contador de puntos.
- Uso de eventos, clases y animaciones para hacer la pagina mas interactiva.

### 5. Scroll To Top

- Boton fijo visible al hacer scroll.
- Regreso suave al inicio de la pagina.
- Disponible en todas las paginas excepto en `404.html`.

### 6. Menu hamburguesa

- Visible a partir de tablet y mobile.
- Animacion del icono de tres lineas a `X`.
- Apertura del panel con transicion suave.
- Microinteracciones en hover y en la entrada de enlaces.
- Cierre al hacer click en un enlace.
- Cierre al hacer click fuera del menu.
- Cierre con la tecla `Escape`.
- Menu horizontal normal en desktop.

### 7. Responsive design

El proyecto fue adaptado para tres grandes rangos:

- Mobile
- Tablet / laptop
- Desktop

Se ajustaron:

- Header y navegacion
- Hero section
- Grids de proyectos y servicios
- Formularios
- Tarjetas
- Newsletter
- Vista detalle de proyectos
- Espaciados y tipografias
- Elementos flotantes como el boton de scroll

## Estructura del proyecto

```text
circle-studio-project_Ithaisa/
|-- assets/
|-- 404.html
|-- css/
|   |-- 404.css
|   |-- contact.css
|   |-- global.css
|   |-- home.css
|   `-- projects.css
|-- js/
|   |-- 404.js
|   |-- contact.js
|   |-- menu.js
|   |-- projects.js
|   `-- scroll-top.js
|-- pages/
|   |-- 404.html
|   |-- contact.html
|   `-- projects.html
|-- index.html
`-- README.md
```

## Documentacion del codigo añadido

### HTML

Se actualizo la estructura del header en las paginas con navegacion compartida:

- `index.html`
- `pages/contact.html`
- `pages/projects.html`

Cambios:

- Se añadio el boton `.menu-toggle`.
- Se agruparon navegacion y CTA dentro de `.header-menu`.
- Se enlazo el nuevo script `menu.js`.
- Se mantuvo el boton `scroll-top-btn` en las paginas normales.

### CSS

#### `css/global.css`

Archivo base del proyecto. Aqui se documentan varios de los cambios mas importantes:

- Variables CSS globales.
- Tipografias fluidas con `clamp()`.
- Ajustes responsive generales para header, footer y botones.
- Estilos del boton de scroll:
  - posicion fija
  - animacion de entrada y salida
  - estados hover
- Estilos del menu hamburguesa:
  - boton hamburguesa
  - lineas animadas
  - transformacion a `X`
  - panel desplegable
  - animacion de apertura
  - comportamiento responsive segun breakpoint

#### `css/home.css`

- Responsive de la home.
- Ajustes del hero para pantallas pequenas.
- Reorganizacion de grids de proyectos y servicios.
- Espaciados nuevos para mobile.
- Ajustes visuales del testimonial y newsletter.

#### `css/contact.css`

- Responsive del formulario.
- Cambio de dos columnas a una columna en mobile.
- Ajustes de padding, gaps y altura del textarea.

#### `css/projects.css`

- Responsive de las tarjetas de proyectos.
- Ajustes del detalle del proyecto.
- Cambio de layout entre mobile, tablet y desktop.
- Mejora de newsletter en la pagina de proyectos.

#### `css/404.css`

- Mantiene los estilos de la pagina 404.
- Esta pagina queda fuera del boton scroll y del menu hamburguesa.

### JavaScript

#### `js/projects.js`

Responsabilidad:

- Cargar los 3 primeros proyectos en la home.
- Obtener proyectos desde la API.
- Renderizar listado general si no hay `id`.
- Renderizar detalle si existe `id` en la URL.
- Mostrar otros proyectos en la vista de detalle.

Logica principal:

- `window.onload` inicia la carga de datos.
- `fetch(API_URL)` obtiene los datos.
- `URLSearchParams(window.location.search)` lee parametros.
- `projects.find(...)` encuentra el proyecto seleccionado.
- Se actualiza el DOM dinamicamente con imagen, titulo, descripcion y datos extra.

#### `js/contact.js`

Responsabilidad:

- Validar el formulario de contacto.
- Mostrar mensajes de error.
- Marcar visualmente cada campo segun su estado.

Funciones principales:

- `validateName()`: valida que el nombre no este vacio.
- `validateEmail()`: valida campo obligatorio y formato correcto de email.
- `validatePhone()`: valida campo obligatorio, longitud minima y que solo tenga numeros o simbolos permitidos.
- `validateMessage()`: valida que el mensaje exista y tenga longitud minima.
- `showError(input, message)`: pinta el borde en rojo y crea el mensaje debajo del campo.
- `showSuccess(input)`: pinta el borde en verde.
- `removeError(input)`: elimina errores previos del campo.
- `clearErrors()`: elimina todos los mensajes visibles y reinicia estilos.

Eventos usados:

- `submit` para validar el formulario completo.
- `input` para validar en tiempo real mientras se escribe.

#### `js/404.js`

Responsabilidad:

- Gestionar las interacciones de la pagina 404.

Funciones principales:

- `showFunFact()`: muestra una frase aleatoria.
- `addStarPoints(event)`: suma puntos al pulsar una estrella y activa una animacion.

Eventos usados:

- `click` en el boton de chistes.
- `click` en cada estrella del minijuego.

#### `js/scroll-top.js`

Responsabilidad:

- Controlar el boton flotante para volver al inicio.

Logica principal:

- Busca el elemento `#scroll-top-btn`.
- Muestra el boton cuando `window.scrollY > 300`.
- Lo oculta cuando el usuario vuelve arriba.
- Hace scroll suave al inicio con `window.scrollTo({ top: 0, behavior: "smooth" })`.

#### `js/menu.js`

Responsabilidad:

- Controlar el menu hamburguesa en tablet y mobile.

Logica principal:

- Busca `.menu-toggle` y `.header-menu`.
- Usa `matchMedia("(max-width: 991px)")` para aplicar el comportamiento responsive.
- Cambia `aria-expanded` y `aria-label` del boton para accesibilidad.
- Anade o elimina la clase `.is-open` al contenedor del menu.

Funciones principales:

- `closeMenu()`: cierra el menu y restaura atributos accesibles.
- `toggleMenu()`: abre o cierra el menu segun su estado actual.

Eventos usados:

- `click` en el boton hamburguesa.
- `click` en enlaces del menu para cerrarlo tras navegar.
- `click` en el documento para cerrarlo al pulsar fuera.
- `keydown` para cerrarlo con `Escape`.
- `change` sobre `matchMedia` para resetear el estado al volver a desktop.

## Breakpoints trabajados

Los estilos se organizaron pensando en estos cortes principales:

- `max-width: 767px` para mobile
- `max-width: 991px` para tablet y navegacion hamburguesa
- `min-width: 768px` para tablet en adelante
- `min-width: 992px` para desktop
- ajustes especificos entre `768px` y `1199px` o `1024px` segun la seccion

## Como ejecutar el proyecto

1. Clona o descarga este repositorio.
2. Abre la carpeta del proyecto en tu editor.
3. Ejecuta la web con Live Server o abre `index.html` en el navegador.

## Objetivos de aprendizaje

- Practicar HTML semantico.
- Organizar una web multipagina.
- Trabajar con CSS modular por pagina.
- Implementar responsive design real.
- Consumir una API externa con `fetch()`.
- Manipular el DOM con JavaScript.
- Gestionar formularios con validacion personalizada.
- Mejorar la experiencia de usuario con microinteracciones.
- Crear navegacion responsive con menu hamburguesa.

## Mejoras futuras posibles

- Mover los estilos inline de validacion a clases CSS.
- Mejorar aun mas la accesibilidad del formulario con mensajes asociados.
- Anadir focus states mas elaborados para navegacion por teclado.
- Incorporar filtros o busqueda en la pagina de proyectos.
- Corregir pequenos textos del contenido general.
- Anadir una demo publicada en Netlify o Vercel.

## Autoria

Proyecto desarrollado por Ithaisa.
