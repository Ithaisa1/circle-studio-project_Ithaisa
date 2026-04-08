const menuToggle = document.querySelector(".menu-toggle");
const headerMenu = document.querySelector(".header-menu");

if (menuToggle && headerMenu) {
  const menuLinks = headerMenu.querySelectorAll("a");
  const tabletBreakpoint = window.matchMedia("(max-width: 991px)");

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    headerMenu.classList.remove("is-open");
  }

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      closeMenu();
    } else {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
      headerMenu.classList.add("is-open");
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (tabletBreakpoint.matches) {
        closeMenu();
      }
    });
  });

  tabletBreakpoint.addEventListener("change", function (event) {
    if (!event.matches) {
      closeMenu();
    }
  });

  document.addEventListener("click", function (event) {
    const clickedInsideMenu = headerMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle && tabletBreakpoint.matches) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && tabletBreakpoint.matches) {
      closeMenu();
    }
  });
}
