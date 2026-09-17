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

  _showInputError() {
    const errorElement = this._formElement.querySelector(
      `#${this._input.name}-error`
    );

    this._input.classList.add(this._config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = this._input.validationMessage;
    }
  }

  _hideInputError() {
    const errorElement = this._formElement.querySelector(
      `#${this._input.name}-error`
    );

    this._input.classList.remove(this._config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  _checkInputValidity() {
    if (!this._input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
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
        this._input = input;
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputs.forEach((input) => {
      this._input = input;
      this._hideInputError();
    });

    this._toggleButtonState();
  }
}