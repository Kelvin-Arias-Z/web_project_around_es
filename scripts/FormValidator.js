export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(
      `#${input.name}-error`
    );

    input.classList.add(this._config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = input.validationMessage;
    }
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(
      `#${input.name}-error`
    );

    input.classList.remove(this._config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputs.every(
      (input) => input.validity.valid
    );

    if (isFormValid) {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(
        this._config.inactiveButtonClass
      );
    } else {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(
        this._config.inactiveButtonClass
      );
    }
  }

  setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });

    this._toggleButtonState();
  }
}