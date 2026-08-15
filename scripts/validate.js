const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

function showInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.name}-error`);
  input.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = input.validationMessage;
  }
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.name}-error`);
  input.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
  }
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

function toggleButtonState(inputs, button, config) {
  const isFormValid = inputs.every((input) => input.validity.valid);
  if (isFormValid) {
    button.removeAttribute("disabled");
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.setAttribute("disabled", true);
    button.classList.add(config.inactiveButtonClass);
  }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

function resetValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => hideInputError(form, input, config));
  toggleButtonState(inputs, button, config);
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => setEventListeners(form, config));
}
