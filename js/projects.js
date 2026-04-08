const API_URL = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

const projectsList = document.getElementById("projects-list");
const projectDetail = document.getElementById("project-detail");
const detailImage = document.getElementById("detail-image");
const detailTitle = document.getElementById("detail-title");
const detailSubtitle = document.getElementById("detail-subtitle");
const detailDescription = document.getElementById("detail-description");
const detailFeatures = document.getElementById("detail-features");

fetch(API_URL)
  .then((response) => response.json())
  .then((projects) => {
    const parameters = new URLSearchParams(window.location.search);
    const projectId = parameters.get("id");

    if (projectId) {
      const selectedProject = projects.find((project) => project.uuid === projectId);

      if (selectedProject) {
        detailImage.src = selectedProject.image;
        detailImage.alt = selectedProject.name;
        detailTitle.textContent = selectedProject.name;
        detailSubtitle.textContent = selectedProject.description;
        detailDescription.textContent = selectedProject.content;
        detailFeatures.innerHTML = `
          <li>Completed on: ${selectedProject.completed_on}</li>
          <li>Project ID: ${selectedProject.uuid}</li>
        `;

        projectDetail.setAttribute("aria-hidden", "false");
      }

      const otherProjects = projects.filter((project) => project.uuid !== projectId);

      otherProjects.forEach((project) => {
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
    } else {
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
    console.log("Error:", error);
    projectsList.innerHTML = "<p>Error loading projects</p>";
  });
