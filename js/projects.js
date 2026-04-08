/**
 * URL base de la API remota que devuelve los proyectos.
 */
const API_URL = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

/**
 * Referencias a elementos del DOM utilizados en home y projects.
 *
 * - `homeProjectsContainer` se usa en la home.
 * - `projectsList` se usa en la pagina de proyectos.
 * - `projectDetail` y el resto de elementos se usan en la vista detalle.
 */
const homeProjectsContainer = document.getElementById("projects-container");
const projectsList = document.getElementById("projects-list");
const projectDetail = document.getElementById("project-detail");
const otherProjectsTitle = document.getElementById("other-projects-title");

const detailImage = document.getElementById("detail-image");
const detailTitle = document.getElementById("detail-title");
const detailSubtitle = document.getElementById("detail-subtitle");
const detailDescription = document.getElementById("detail-description");
const detailFeatures = document.getElementById("detail-features");

/**
 * Espera a que cargue la ventana y entonces hace la peticion a la API.
 *
 * Segun la pagina:
 * - en home pinta los 3 primeros proyectos
 * - en projects pinta el listado completo o el detalle
 */
window.onload = function () {
  fetch(API_URL)
    .then((response) => response.json())
    .then((projects) => {
      if (homeProjectsContainer) {
        renderHomeProjects(projects.slice(0, 3));
      }

      if (projectsList) {
        renderProjectsPage(projects);
      }
    })
    .catch((error) => {
      console.error("Error:", error);

      if (homeProjectsContainer) {
        homeProjectsContainer.innerHTML = "<p>Error loading projects</p>";
      }

      if (projectsList) {
        projectsList.innerHTML = "<p>Error loading projects</p>";
      }
    });
};

/**
 * Renderiza los tres proyectos recientes en la home.
 *
 * @param {Array<Object>} projects
 */
function renderHomeProjects(projects) {
  homeProjectsContainer.innerHTML = projects
    .map(function (project) {
      return createProjectCard(project, "pages/projects.html");
    })
    .join("");
}

/**
 * Gestiona el comportamiento de la pagina de proyectos.
 *
 * Casos:
 * - si no hay `id`, muestra el listado completo
 * - si hay `id`, muestra el detalle del proyecto y otros proyectos
 *
 * @param {Array<Object>} projects
 */
function renderProjectsPage(projects) {
  const parameters = new URLSearchParams(window.location.search);
  const projectId = parameters.get("id");

  if (!projectId) {
    projectsList.innerHTML = projects
      .map(function (project) {
        return createProjectCard(project, "projects.html");
      })
      .join("");
    return;
  }

  const selectedProject = projects.find(function (project) {
    return project.uuid === projectId;
  });

  if (!selectedProject) {
    alert("This project does not exist. You will be redirected to the 404 page.");
    window.location.href = "../404.html";
    return;
  }

  renderProjectDetail(selectedProject);

  const otherProjects = projects
    .filter(function (project) {
      return project.uuid !== selectedProject.uuid;
    })
    .slice(0, 3);

  if (otherProjectsTitle) {
    otherProjectsTitle.hidden = false;
  }

  projectsList.innerHTML = otherProjects
    .map(function (project) {
      return createProjectCard(project, "projects.html");
    })
    .join("");
}

/**
 * Rellena el bloque de detalle del proyecto seleccionado.
 *
 * @param {Object} project
 */
function renderProjectDetail(project) {
  detailImage.src = project.image;
  detailImage.alt = project.name;
  detailTitle.textContent = project.name;
  detailSubtitle.textContent = project.description;
  detailDescription.innerHTML = project.content;
  detailFeatures.innerHTML = `
    <li>Completed on: ${project.completed_on}</li>
    <li>Project ID: ${project.uuid}</li>
  `;
  projectDetail.setAttribute("aria-hidden", "false");
}

/**
 * Genera el HTML de una tarjeta de proyecto reutilizable.
 *
 * @param {Object} project
 * @param {string} basePath
 * @returns {string}
 */
function createProjectCard(project, basePath) {
  return `
    <article class="project-card">
      <img src="${project.image}" alt="${project.name}">
      <div class="project-inner-card">
        <h3 class="project-title">${project.name}</h3>
        <p class="project-description">${project.description}</p>
        <a class="learn-more" href="${basePath}?id=${project.uuid}">Learn more</a>
      </div>
    </article>
  `;
}
