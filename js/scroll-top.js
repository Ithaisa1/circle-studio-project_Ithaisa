/**
 * Referencia al boton flotante que devuelve al inicio.
 */
const scrollTopButton = document.getElementById("scroll-top-btn");

/**
 * Si el boton existe en la pagina,
 * se activa su comportamiento visual y funcional.
 */
if (scrollTopButton) {
  /**
   * Muestra u oculta el boton segun la posicion del scroll.
   */
  function toggleScrollButton() {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add("is-visible");
    } else {
      scrollTopButton.classList.remove("is-visible");
    }
  }

  /**
   * Al hacer click, lleva suavemente al principio de la pagina.
   */
  scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /**
   * Observa el scroll de la ventana y actualiza el estado del boton.
   */
  window.addEventListener("scroll", toggleScrollButton);
  toggleScrollButton();
}
