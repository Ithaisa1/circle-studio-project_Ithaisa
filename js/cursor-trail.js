/**
 * Efecto global de estela del cursor.
 *
 * Objetivos:
 * - mantener el efecto ligero con un solo canvas
 * - reutilizar la paleta visual del proyecto
 * - respetar accesibilidad y dispositivos tactiles
 */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersCoarsePointer = window.matchMedia("(pointer: coarse)");

if (!prefersReducedMotion.matches && !prefersCoarsePointer.matches) {
  const trailCanvas = document.createElement("canvas");
  const trailContext = trailCanvas.getContext("2d");
  const particles = [];
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const maxParticles = 36;
  let animationFrameId = null;
  let particlePalette = getProjectPalette();

  trailCanvas.className = "cursor-trail";
  document.body.appendChild(trailCanvas);

  /**
   * Lee variables CSS del tema activo para construir
   * una paleta coherente con el resto del proyecto.
   *
   * @returns {string[]}
   */
  function getProjectPalette() {
    const styles = window.getComputedStyle(document.documentElement);

    return [
      styles.getPropertyValue("--Primary").trim(),
      styles.getPropertyValue("--PrimaryLight").trim(),
      styles.getPropertyValue("--SecondaryLight").trim(),
      styles.getPropertyValue("--SecondaryDark").trim(),
    ].filter(Boolean);
  }

  /**
   * Ajusta el tamano del canvas al viewport actual.
   */
  function resizeCanvas() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  }

  /**
   * Crea una nueva particula en la posicion actual del puntero.
   *
   * @param {number} x
   * @param {number} y
   */
  function createParticle(x, y) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.6 + 1.4,
      life: 1,
      decay: Math.random() * 0.03 + 0.03,
      color: particlePalette[Math.floor(Math.random() * particlePalette.length)],
    });

    if (particles.length > maxParticles) {
      particles.shift();
    }
  }

  /**
   * Dibuja y actualiza las particulas activas en cada frame.
   */
  function drawParticles() {
    trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= particle.decay;
      particle.radius *= 0.985;

      if (particle.life <= 0.02 || particle.radius <= 0.4) {
        particles.splice(index, 1);
        continue;
      }

      trailContext.beginPath();
      trailContext.globalAlpha = particle.life;
      trailContext.fillStyle = particle.color;
      trailContext.shadowBlur = 6;
      trailContext.shadowColor = particle.color;
      trailContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      trailContext.fill();
    }

    trailContext.globalAlpha = 1;
    trailContext.shadowBlur = 0;
    animationFrameId = window.requestAnimationFrame(drawParticles);
  }

  /**
   * Suaviza la posicion del puntero y genera nuevas particulas.
   *
   * @param {PointerEvent} event
   */
  function handlePointerMove(event) {
    pointer.x += (event.clientX - pointer.x) * 0.35;
    pointer.y += (event.clientY - pointer.y) * 0.35;
    createParticle(pointer.x, pointer.y);
  }

  /**
   * Detiene el efecto y limpia el canvas.
   */
  function stopTrail() {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    particles.length = 0;
    trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  }

  /**
   * Si cambia el tema, refresca la paleta usada por las particulas.
   */
  function syncPaletteWithTheme() {
    particlePalette = getProjectPalette();
  }

  resizeCanvas();
  drawParticles();

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerleave", stopTrail);

  new MutationObserver(syncPaletteWithTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  prefersReducedMotion.addEventListener("change", function (event) {
    if (event.matches) {
      stopTrail();
      trailCanvas.remove();
    }
  });
}
