/**
 * Array de frases graciosas que se mostrarán aleatoriamente
 * cuando el usuario pulse el botón correspondiente.
 */
const facts = [
  '— ¿Qué hace una abeja en el gimnasio? — Zum-ba',
  '— ¿Qué le dice un techo a otro? — Techo de menos',
  '— ¿Por qué los pájaros no usan Facebook? — Porque ya tienen Twitter',
  '— ¿Cómo se despiden los químicos? — Ácido un placer',
  '— ¿Qué hace una vaca cuando sale el sol?— Sombra',
  '— ¿Cuál es el colmo de un jardinero? — Que siempre lo dejen plantado',
  '— ¿Qué le dijo un pez a otro? — Nada',
  '— ¿Qué le dijo un semáforo a otro? — No me mires que me estoy cambiando',
  '— ¿Cuál es el café más peligroso? — El ex-preso',
  '— ¿En qué se diferencian una cueva a una bala? — En que en la cueva hay humedad y la bala "u me da o nu me da"',
  '— Tengo un amigo otaku que estaba triste, así que lo animé',
  '— Me he ido de la conveción de química, los sodio a todos!',
  '— Van dos fantasmas y se cae el médium',
  '— ¿Qué le dice un ganso a una gansa= - Ven gansa',
  '— Tienes que decir dos palabras que tengan tilde. - Fácil Clotilde y Matilde',
  '— ¿Cuál es el masculino de oca? - Parchís',
  '— Doctor soy asmátic, ¿es grave? - No es esdrújula',
  '— En Hawai no te hospedan, te alohan',
  '— Soy celíaca. Encantado, yo Antoniaco',
  '— Oiga, usted está empadronado?  No, qué va, es mi carácter… ',
  '— Cariño, has visto mi crema reafirmante?  Sí, sí, sí, sí, sí y sí! ',
  '— Me da un café con leche corto... Se me ha roto la máquina, cambio.',
  '— Esto es un hombre que entra en un bar de pinchos y dice: "Ay, ay, ay, ay"...',
  '— Está Agustín? No, estoy incomodín',
  '— Profe, profe, mi boli no escribe! Pues dale aliento  Vamoooos boli, tú puedes, boli!!!',
];

/**
 * Referencias a elementos del DOM utilizados por la página 404.
 *
 * - `funFactElement` muestra el chiste o frase seleccionada.
 * - `factButton` dispara la aparición de una nueva frase.
 * - `stars` contiene todas las estrellas clicables del minijuego.
 * - `starScore` muestra la puntuación acumulada.
 */
const funFactElement = document.querySelector('.fun-fact');
const factButton = document.getElementById('fact-button');
const stars = document.querySelectorAll('.star');
const starScore = document.getElementById('star-score');

/**
 * Variable que guarda la puntuación actual del usuario.
 * Empieza en 0 y aumenta cada vez que se pulsa una estrella.
 */
let score = 0;

/**
 * Muestra una frase aleatoria del array `facts` en pantalla.
 *
 * Funcionamiento:
 * 1. Genera una posición aleatoria dentro del array.
 * 2. Obtiene la frase en esa posición.
 * 3. Inserta el texto dentro del elemento `.fun-fact`.
 * 4. Añade la clase `visible` para mostrarlo visualmente.
 *
 * @returns {undefined}
 */
function showFunFact() {
  const random = facts[Math.floor(Math.random() * facts.length)];
  funFactElement.textContent = random;
  funFactElement.classList.add('visible');
}

/**
 * Suma puntos al marcador cuando el usuario hace clic en una estrella.
 *
 * Funcionamiento:
 * 1. Lee los puntos desde el atributo `data-points` de la estrella pulsada.
 * 2. Si no existe ese atributo, usa 5 puntos por defecto.
 * 3. Actualiza la variable `score`.
 * 4. Refleja el nuevo valor en el marcador visual.
 * 5. Añade una clase temporal para lanzar una animación.
 *
 * @param {Event} event - Evento generado al hacer clic sobre una estrella.
 * @returns {undefined}
 */
function addStarPoints(event) {
  const points = Number(event.target.dataset.points) || 5;
  score += points;
  starScore.textContent = score;
  event.target.classList.add('star-pop');

  /**
   * Quita la clase de animación después de 300 ms
   * para que el efecto pueda volver a activarse
   * en futuros clics.
   */
  setTimeout(() => event.target.classList.remove('star-pop'), 300);
}

/**
 * Evento del botón:
 * cada clic muestra una nueva frase aleatoria.
 */
factButton.addEventListener('click', showFunFact);

/**
 * Evento de cada estrella:
 * cada clic suma puntos y activa su animación.
 */
stars.forEach((star) => star.addEventListener('click', addStarPoints));
