/**
 * Referencias principales del formulario de contacto.
 *
 * - `form` representa el formulario completo.
 * - Cada input se guarda por separado para validarlo de forma individual.
 * - `inputs` permite recorrer todos los campos cuando hay que limpiar estados.
 */
const form = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const inputs = [nameInput, emailInput, phoneInput, messageInput];

/**
 * Evento principal del formulario.
 *
 * Flujo:
 * 1. Evita el envio por defecto.
 * 2. Limpia errores previos.
 * 3. Ejecuta todas las validaciones.
 * 4. Si todo es correcto, muestra un mensaje de exito y reinicia el formulario.
 */
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  clearErrors();

  if (!validateName()) {
    isValid = false;
  }

  if (!validateEmail()) {
    isValid = false;
  }

  if (!validatePhone()) {
    isValid = false;
  }

  if (!validateMessage()) {
    isValid = false;
  }

  if (isValid) {
    showSuccessPopup();
    form.reset();
    clearErrors();
  }
});

/**
 * Validacion en tiempo real:
 * cada campo se comprueba mientras el usuario escribe.
 */
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
messageInput.addEventListener("input", validateMessage);

/**
 * Valida el campo nombre.
 *
 * Reglas:
 * - no puede estar vacio
 * - no puede ser "ironhack"
 *
 * @returns {boolean}
 */
function validateName() {
  const value = nameInput.value.trim();

  if (value === "") {
    showError(nameInput, "Name is required");
    return false;
  }

  if (value.toLowerCase() === "ironhack") {
    showError(nameInput, "You cannot be Ironhack, because I am Ironhack.");
    return false;
  }

  showSuccess(nameInput);
  return true;
}

/**
 * Valida el campo email.
 *
 * Reglas:
 * - no puede estar vacio
 * - debe cumplir un formato basico de email
 *
 * @returns {boolean}
 */
function validateEmail() {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === "") {
    showError(emailInput, "Email is required");
    return false;
  }

  if (!emailPattern.test(value)) {
    showError(emailInput, "Email is not valid");
    return false;
  }

  showSuccess(emailInput);
  return true;
}

/**
 * Valida el campo telefono.
 *
 * Reglas:
 * - no puede estar vacio
 * - solo acepta numeros y simbolos tipicos de telefono
 * - debe tener al menos 9 caracteres
 *
 * @returns {boolean}
 */
function validatePhone() {
  const value = phoneInput.value.trim();
  const phonePattern = /^[0-9+\-()\s]+$/;

  if (value === "") {
    showError(phoneInput, "Phone is required");
    return false;
  }

  if (!phonePattern.test(value)) {
    showError(phoneInput, "Phone can only contain numbers and symbols");
    return false;
  }

  if (value.length < 9) {
    showError(phoneInput, "Phone must have at least 9 characters");
    return false;
  }

  showSuccess(phoneInput);
  return true;
}

/**
 * Valida el campo mensaje.
 *
 * Reglas:
 * - no puede estar vacio
 * - debe tener una longitud minima
 *
 * @returns {boolean}
 */
function validateMessage() {
  const value = messageInput.value.trim();

  if (value === "") {
    showError(messageInput, "Message is required");
    return false;
  }

  if (value.length < 10) {
    showError(messageInput, "Message must have at least 10 characters");
    return false;
  }

  showSuccess(messageInput);
  return true;
}

/**
 * Muestra un error visual en un campo.
 *
 * Acciones:
 * - elimina un error anterior del mismo input
 * - crea el mensaje de error debajo del campo
 * - aplica borde rojo
 *
 * @param {HTMLElement} input
 * @param {string} message
 */
function showError(input, message) {
  removeError(input);

  const error = document.createElement("p");
  error.className = "error-message";
  error.textContent = message;
  error.style.color = "red";
  error.style.fontSize = "14px";
  error.style.marginTop = "5px";

  input.style.border = "1px solid red";
  input.parentElement.appendChild(error);
}

/**
 * Marca un campo como valido.
 *
 * @param {HTMLElement} input
 */
function showSuccess(input) {
  removeError(input);
  input.style.border = "1px solid green";
}

/**
 * Elimina el mensaje de error asociado a un campo concreto, si existe.
 *
 * @param {HTMLElement} input
 */
function removeError(input) {
  const existingError = input.parentElement.querySelector(".error-message");

  if (existingError) {
    existingError.remove();
  }
}

/**
 * Limpia todos los mensajes de error visibles
 * y restaura el borde original de todos los inputs.
 */
function clearErrors() {
  const errors = document.querySelectorAll(".error-message");

  errors.forEach(function (error) {
    error.remove();
  });

  inputs.forEach(function (input) {
    input.style.border = "";
  });
}

/**
 * Muestra un popup centrado de confirmacion
 * cuando el formulario se ha validado correctamente.
 */
function showSuccessPopup() {
  const existingPopup = document.querySelector(".success-popup-overlay");

  if (existingPopup) {
    existingPopup.remove();
  }

  const overlay = document.createElement("div");
  overlay.className = "success-popup-overlay";

  overlay.innerHTML = `
    <div class="success-popup-card" role="alert" aria-live="assertive">
      <div class="success-popup-icon">&#10003;</div>
      <h2>El formulario se ha enviado correctamente</h2>
      <p>Gracias por contactarnos.</p>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(function () {
    overlay.classList.add("is-visible");
  }, 10);

  setTimeout(function () {
    overlay.classList.remove("is-visible");

    setTimeout(function () {
      overlay.remove();
    }, 300);
  }, 2200);
}
