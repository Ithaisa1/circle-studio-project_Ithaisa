/**
 * Referencias al header compartido.
 *
 * - `siteHeader` controla el comportamiento sticky.
 * - `menuToggle` es el boton hamburguesa.
 * - `headerMenu` es el panel desplegable en tablet y mobile.
 * - `themeToggle` alterna entre modo claro y oscuro.
 */
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const headerMenu = document.querySelector(".header-menu");
const themeToggle = document.getElementById("theme-toggle");

/**
 * Gestion del tema visual:
 * guarda la preferencia del usuario y alterna entre modo claro y oscuro.
 */
if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const initialTheme = savedTheme || preferredTheme;

  document.documentElement.setAttribute("data-theme", initialTheme);
  updateThemeToggleLabel(initialTheme);

  themeToggle.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeToggleLabel(nextTheme);
  });
}

/**
 * Actualiza el icono y la etiqueta accesible del boton de tema.
 *
 * @param {string} theme
 */
function updateThemeToggleLabel(theme) {
  if (!themeToggle) {
    return;
  }

  themeToggle.textContent = theme === "dark" ? "\u2600" : "\u263E";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
}

/**
 * Bloque de header sticky:
 * activa una clase cuando el usuario baja un poco por la pagina.
 */
if (siteHeader) {
  /**
   * Anade o quita la clase `is-sticky`
   * segun la posicion actual del scroll.
   */
  function toggleStickyHeader() {
    if (window.scrollY > 24) {
      siteHeader.classList.add("is-sticky");
    } else {
      siteHeader.classList.remove("is-sticky");
    }
  }

  window.addEventListener("scroll", toggleStickyHeader);
  toggleStickyHeader();
}

/**
 * Bloque de menu hamburguesa:
 * solo se activa cuando el header tiene boton y panel de menu.
 */
if (menuToggle && headerMenu) {
  const menuLinks = headerMenu.querySelectorAll("a");
  const tabletBreakpoint = window.matchMedia("(max-width: 991px)");

  /**
   * Cierra el menu y restaura los atributos accesibles del boton.
   */
  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    headerMenu.classList.remove("is-open");
  }

  /**
   * Abre o cierra el menu segun su estado actual.
   */
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

  /**
   * Al hacer click en el boton hamburguesa, alterna el panel.
   */
  menuToggle.addEventListener("click", toggleMenu);

  /**
   * Al navegar desde el menu en tablet/mobile,
   * el panel se cierra automaticamente.
   */
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (tabletBreakpoint.matches) {
        closeMenu();
      }
    });
  });

  /**
   * Si la pantalla vuelve a desktop,
   * se reinicia el estado del menu movil.
   */
  tabletBreakpoint.addEventListener("change", function (event) {
    if (!event.matches) {
      closeMenu();
    }
  });

  /**
   * Si el usuario hace click fuera del menu,
   * el panel se cierra.
   */
  document.addEventListener("click", function (event) {
    const clickedInsideMenu = headerMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle && tabletBreakpoint.matches) {
      closeMenu();
    }
  });

  /**
   * Permite cerrar el menu pulsando Escape.
   */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && tabletBreakpoint.matches) {
      closeMenu();
    }
  });
}
