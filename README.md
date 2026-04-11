# Circle Studio

Proyecto multipagina desarrollado con HTML, CSS y JavaScript para presentar un estudio digital ficticio. La aplicacion combina maquetacion responsive, componentes HTML dinamicos, consumo de datos desde una API externa y varias interacciones de interfaz.

## Resumen

El proyecto incluye:

- Home con hero, slider infinito de clientes, proyectos recientes, testimonial, servicios y newsletter.
- Pagina de proyectos con listado dinamico y vista detalle por `id`.
- Pagina de contacto con validacion personalizada y popup de exito.
- Pagina 404 con chistes aleatorios y minijuego de estrellas.
- Componentes HTML dinamicos (header, footer, newsletter) cargados via JavaScript.
- Header compartido con menu hamburguesa, tema claro/oscuro y estado sticky.
- Boton global de scroll hacia arriba.
- Fondo ambiental animado y estela de particulas siguiendo el cursor en dispositivos compatibles.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Fetch API
- API JSON remota de Ironhack
- Git y Github
- Netlify (despliegue)
- IA (para apoyo en el desarrollo)

## Estructura del proyecto

```text
circle-studio-project_Ithaisa/
|-- assets/
|   |-- hero-section/
|   |-- logos/
|   |-- newsletter/
|   |-- projects-section/
|   |-- services-section/
|   `-- testimonial-section/
|-- components/
|   |-- footer.html
|   |-- header.html
|   `-- newsletter.html
|-- css/
|   |-- 404.css
|   |-- contact.css
|   |-- global.css
|   |-- home.css
|   |-- projects.css
|   `-- style.css.backup
|-- js/
|   |-- 404.js
|   |-- components.js
|   |-- contact.js
|   |-- cursor-trail.js
|   |-- header.js
|   |-- projects.js
|   `-- scroll-top.js
|-- pages/
|   |-- contact.html
|   `-- projects.html
|-- 404.html
|-- index.html
|-- mid-term-project.fig
`-- README.md
```

## Paginas

### `index.html`

- Pagina principal del proyecto.
- Muestra la presentacion del estudio y sus secciones principales.
- Carga proyectos recientes desde la API.
- Carga componentes dinamicos (header, footer, newsletter) via JavaScript.
- Incluye newsletter reutilizable cargada como componente.

### `pages/projects.html`

- Muestra todos los proyectos o el detalle de uno concreto segun el parametro `id` en la URL.
- Reutiliza el mismo componente visual de cards que la home.
- Carga componentes dinamicos (header, footer, newsletter) via JavaScript.
- Incluye el newsletter reutilizable cargado como componente.

Ejemplo:

```text
pages/projects.html?id=1
```

### `pages/contact.html`

- Incluye el formulario de contacto.
- Valida campos en tiempo real y al enviar.
- Muestra un popup temporal de confirmacion si todos los datos son validos.
- Carga componentes dinamicos (header, footer) via JavaScript.

### `404.html`

- Pagina de error personalizada.
- Incluye un boton para mostrar chistes aleatorios.
- Incluye un minijuego simple con estrellas y marcador.

## Componentes HTML

### `components/header.html`

- Header compartido con logo, navegacion y acciones.
- Incluye menu hamburguesa para dispositivos moviles.
- Boton de cambio de tema claro/oscuro.

### `components/footer.html`

- Footer compartido con logo, navegacion y direccion.
- Informacion de copyright y contacto.

### `components/newsletter.html`

- Seccion de newsletter reutilizable.
- Formulario de suscripcion con campo de email.

## Estilos CSS

### `css/global.css`

Archivo base del proyecto. Centraliza:

- Variables globales de color, superficies y sombras.
- Modo claro y oscuro.
- Fondo ambiental animado.
- Estilo compartido de header, footer, newsletter y grids reutilizables.
- Estilos comunes de cards de proyectos y servicios.
- Boton de scroll top.
- Canvas visual para la estela de particulas.
- Reglas responsive globales.

### `css/home.css`

- Hero section.
- Slider infinito de logos de clientes.
- Testimonial y sus variantes responsive.
- Ajustes especificos de la home.

### `css/projects.css`

- Vista detalle del proyecto.
- Ajustes de imagen, texto y metadatos.
- Comportamiento responsive de la tarjeta detalle.
- Ajustes concretos de la grilla en la pagina de proyectos.

### `css/contact.css`

- Estilos del formulario de contacto.
- Distribucion por filas y columnas.
- Estados visuales del popup de exito.
- Ajustes responsive del formulario.

### `css/404.css`

- Estilo visual exclusivo de la pagina 404.
- Caja principal, botones, estrellas y animaciones del minijuego.

## JavaScript

### `js/components.js`

Carga los componentes HTML dinamicos:

- Funcion `loadComponent(id, file)` para cargar archivos HTML via fetch.
- Inserta el contenido en elementos con IDs especificados.
- Inicializa header, footer y newsletter despues de cargar.
- Carga header, footer y newsletter automaticamente al iniciar.

### `js/header.js`

Controla el comportamiento comun del header:

- Lee y guarda la preferencia de tema en `localStorage`.
- Cambia entre modo claro y oscuro.
- Actualiza la etiqueta accesible del boton de tema.
- Activa el header sticky al hacer scroll.
- Gestiona la apertura y cierre del menu hamburguesa.
- Cierra el menu al navegar, hacer click fuera o pulsar `Escape`.

### `js/scroll-top.js`

Gestiona el boton flotante de volver arriba:

- Lo muestra cuando la pagina supera cierto scroll.
- Lo oculta al volver a la parte superior.
- Ejecuta desplazamiento suave al principio del documento.

### `js/projects.js`

Se encarga de la carga y renderizado de proyectos:

- Obtiene los datos desde la API remota.
- Inserta los tres primeros proyectos en la home.
- Pinta el listado completo en `pages/projects.html`.
- Detecta el parametro `id` de la URL para mostrar el detalle.
- Si el proyecto no existe, redirige a `404.html`.
- Reutiliza una funcion para generar las cards de proyecto.

### `js/contact.js`

Valida el formulario de contacto:

- Comprueba nombre, email, telefono y mensaje.
- Muestra errores debajo de cada campo.
- Marca visualmente campos validos e invalidos.
- Ejecuta validacion en tiempo real mientras el usuario escribe.
- Muestra un popup de exito si el formulario es correcto.

### `js/404.js`

Gestiona las interacciones de la pagina 404:

- Muestra un chiste aleatorio al pulsar el boton.
- Suma puntos en el minijuego de estrellas.
- Actualiza el contador visual.
- Aplica una animacion corta a la estrella pulsada.

### `js/cursor-trail.js`

Genera la estela de particulas del cursor:

- Crea un `canvas` fijo sobre la pagina.
- Usa un unico bucle `requestAnimationFrame` para mantener el efecto ligero.
- Dibuja particulas redondas y pequeñas.
- Hace que las particulas se desvanezcan progresivamente.
- Usa la paleta del proyecto leyendo variables CSS.
- Se desactiva en pantallas tactiles y con `prefers-reduced-motion`.

## Funcionalidades principales

### Home

- Hero con llamadas a la accion.
- Slider infinito de logos de clientes.
- Proyectos recientes cargados dinamicamente.
- Testimonial destacado.
- Servicios del estudio.
- Newsletter reutilizable cargado como componente.

### Projects

- Listado completo de proyectos.
- Vista detalle por URL.
- Seccion de otros proyectos.
- Manejo de error para proyectos inexistentes.
- Newsletter reutilizable cargado como componente.

### Contact

- Validacion completa del formulario.
- Errores visibles y feedback inmediato.
- Popup de confirmacion al enviar correctamente.
- Header y footer cargados como componentes.

### 404

- Lista de chistes aleatorios.
- Minijuego de puntuacion con estrellas.

### UI compartida

- Header sticky reutilizable cargado como componente.
- Menu hamburguesa responsive.
- Tema claro/oscuro.
- Boton scroll top.
- Footer reutilizable cargado como componente.
- Newsletter reutilizable cargado como componente.
- Fondo con movimiento sutil.
- Estela de particulas siguiendo el cursor.

## Responsive

Los estilos se organizan principalmente con estos breakpoints:

- `max-width: 767px` para mobile
- `max-width: 991px` para menu hamburguesa
- `min-width: 768px` para tablet en adelante
- `min-width: 992px` para desktop
- Ajustes intermedios entre `768px` y `1199px` en grids y layout

## API usada

Los proyectos se obtienen desde:

```text
https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects
```

Cada proyecto incluye informacion como:

- nombre
- descripcion
- imagen
- contenido HTML
- fecha
- identificador unico

## Como ejecutar el proyecto

1. Descarga o clona el repositorio.
2. Abre la carpeta en tu editor.
3. Ejecuta la web con Live Server o abre `index.html` en el navegador.

## Notas de mantenimiento

- Los estilos compartidos viven en `css/global.css`.
- Los estilos especificos por pagina viven en su archivo correspondiente.
- Los componentes HTML reutilizables (header, footer, newsletter) estan en la carpeta `components/`.
- La carga de componentes se gestiona via `js/components.js`.
- El newsletter esta centralizado como componente HTML y sus estilos en `global.css`.
- Las cards y grids reutilizables de proyectos y servicios tambien estan centralizadas en `global.css`.
- La pagina 404 esta en la raiz del proyecto como `404.html`.
- El archivo de diseño original esta en `mid-term-project.fig` (Figma).

## Autoria

Proyecto desarrollado por Ithaisa Sánchez González.
