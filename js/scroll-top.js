const scrollTopButton = document.getElementById("scroll-top-btn");

if (scrollTopButton) {
  function toggleScrollButton() {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add("is-visible");
    } else {
      scrollTopButton.classList.remove("is-visible");
    }
  }

  scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", toggleScrollButton);
  toggleScrollButton();
}
