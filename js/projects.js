const API_URL = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

const homeProjectsContainer = document.getElementById("projects-container");
const projectsList = document.getElementById("projects-list");
const projectDetail = document.getElementById("project-detail");
const otherProjectsTitle = document.getElementById("other-projects-title");

const detailImage = document.getElementById("detail-image");
const detailTitle = document.getElementById("detail-title");
const detailSubtitle = document.getElementById("detail-subtitle");
const detailDescription = document.getElementById("detail-description");
const detailFeatures = document.getElementById("detail-features");

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

function renderHomeProjects(projects) {
  homeProjectsContainer.innerHTML = projects
    .map(function (project) {
      return createProjectCard(project, "pages/projects.html");
    })
    .join("");
}

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
    window.location.href = "404.html";
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
