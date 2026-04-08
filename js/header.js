/**
 * Referencias al header compartido.
 *
 * - `siteHeader` controla el comportamiento sticky.
 * - `menuToggle` es el boton hamburguesa.
 * - `headerMenu` es el panel desplegable en tablet y mobile.
 */
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const headerMenu = document.querySelector(".header-menu");

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
