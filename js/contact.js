const form = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  clearErrors();

  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required");
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    showError(emailInput, "Email is not valid");
    isValid = false;
  }

  if (phoneInput.value.trim() === "") {
    showError(phoneInput, "Phone is required");
    isValid = false;
  } else if (phoneInput.value.trim().length < 9) {
    showError(phoneInput, "Phone must have at least 9 characters");
    isValid = false;
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, "Message is required");
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Message must have at least 10 characters");
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully");
    form.reset();
  }
});

function showError(input, message) {
  const error = document.createElement("p");
  error.className = "error-message";
  error.textContent = message;
  error.style.color = "red";
  error.style.fontSize = "14px";
  error.style.marginTop = "5px";

  input.style.border = "1px solid red";
  input.parentElement.appendChild(error);
}

function clearErrors() {
  const errors = document.querySelectorAll(".error-message");

  errors.forEach(function (error) {
    error.remove();
  });

  nameInput.style.border = "";
  emailInput.style.border = "";
  phoneInput.style.border = "";
  messageInput.style.border = "";
}
