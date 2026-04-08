const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
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
