const form = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const inputs = [nameInput, emailInput, phoneInput, messageInput];

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
    alert("Form submitted successfully");
    form.reset();
    clearErrors();
  }
});

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
messageInput.addEventListener("input", validateMessage);

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

function showSuccess(input) {
  removeError(input);
  input.style.border = "1px solid green";
}

function removeError(input) {
  const existingError = input.parentElement.querySelector(".error-message");

  if (existingError) {
    existingError.remove();
  }
}

function clearErrors() {
  const errors = document.querySelectorAll(".error-message");

  errors.forEach(function (error) {
    error.remove();
  });

  inputs.forEach(function (input) {
    input.style.border = "";
  });
}
