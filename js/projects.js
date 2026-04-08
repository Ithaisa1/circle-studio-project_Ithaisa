/**
 * URL base de la API remota.
 * Esta API devuelve un array de proyectos en formato JSON.
 */
const API_URL = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

/**
 * Referencias a los contenedores principales de la página.
 *
 * - `projectsList` muestra el listado completo de proyectos.
 * - `projectDetail` contiene la vista de detalle de un único proyecto.
 */
const projectsList = document.getElementById("projects-list");
const projectDetail = document.getElementById("project-detail");

/**
 * Referencias a los elementos que se rellenan dinámicamente
 * cuando la página se usa en modo detalle.
 */
const detailImage = document.getElementById("detail-image");
const detailTitle = document.getElementById("detail-title");
const detailSubtitle = document.getElementById("detail-subtitle");
const detailDescription = document.getElementById("detail-description");
const detailFeatures = document.getElementById("detail-features");

/**
 * Solicita los datos de todos los proyectos a la API.
 *
 * Flujo general:
 * 1. Hace la petición a la URL remota.
 * 2. Convierte la respuesta en JSON.
 * 3. Comprueba si la URL tiene un parámetro `id`.
 * 4. Si existe `id`, muestra el detalle del proyecto correspondiente.
 * 5. Si no existe `id`, renderiza el listado completo de proyectos.
 */
fetch(API_URL)
  .then((response) => response.json())
  .then((projects) => {
    /**
     * Lee los parámetros de la URL actual.
     * Ejemplo de URL esperada para detalle:
     * `projects.html?id=12345`
     */
    const parameters = new URLSearchParams(window.location.search);
    const projectId = parameters.get("id");

    /**
     * Si hay un `id` en la URL, la página entra en modo detalle.
     */
    if (projectId) {
      /**
       * Busca dentro del array el proyecto cuyo `uuid`
       * coincide con el `id` recibido por la URL.
       */
      const selectedProject = projects.find((project) => project.uuid === projectId);

      /**
       * Si el proyecto existe, se rellenan los datos del bloque de detalle.
       */
      if (selectedProject) {
        detailImage.src = selectedProject.image;
        detailImage.alt = selectedProject.name;
        detailTitle.textContent = selectedProject.name;
        detailSubtitle.textContent = selectedProject.description;
        detailDescription.textContent = selectedProject.content;

        /**
         * Se insertan detalles complementarios en una lista.
         * `innerHTML` se usa aquí porque estamos construyendo
         * varios elementos `<li>` de forma dinámica.
         */
        detailFeatures.innerHTML = `
          <li>Completed on: ${selectedProject.completed_on}</li>
          <li>Project ID: ${selectedProject.uuid}</li>
        `;

        /**
         * Hace visible el contenedor de detalle cambiando su atributo ARIA.
         * Esto también puede ayudar a accesibilidad y estilos condicionales.
         */
        projectDetail.setAttribute("aria-hidden", "false");
      }

      /**
       * Si estamos viendo un proyecto individual,
       * vaciamos la lista general para no mostrar ambos modos a la vez.
       */
      if (projectsList) projectsList.innerHTML = "";
    } else {
      /**
       * Si no hay `id` en la URL, la página muestra todos los proyectos.
       * Se crea una tarjeta por cada elemento recibido desde la API.
       */
      projects.forEach((project) => {
        projectsList.innerHTML += `
          <article class="project-card">
            <img src="${project.image}" alt="${project.name}">
            <div class="project-inner-card">
              <h3 class="project-title">${project.name}</h3>
              <p class="project-description">${project.description}</p>
              <a class="learn-more" href="projects.html?id=${project.uuid}">Learn more</a>
            </div>
          </article>
        `;
      });
    }
  })
  .catch((error) => {
    /**
     * Si ocurre un error en la petición o al procesar los datos:
     * - se muestra el error en consola para depuración,
     * - se informa al usuario dentro del contenedor del listado.
     */
    console.error("Error:", error);

    if (projectsList) {
      projectsList.innerHTML = "<p>Error loading projects</p>";
    }
  });
