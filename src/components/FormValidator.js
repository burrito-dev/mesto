

export class FormValidator {
    constructor(validationSettings, formElement) {
        this._inputSelector = validationSettings.formInputSelector;
        this._submitButtonSelector = validationSettings.formSubmitButtonSelector;
        this._inactiveButtonClass = validationSettings.formInactiveButtonClass;
        this._inputErrorClass = validationSettings.formInputErrorClass;
        this._inputSpanErrorClass = validationSettings.formInputSpanErrorClass;
        this._formElement = formElement;
        this._inputElementList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        // handlers
        this._inputElementValidationHandler = this._inputElementValidationHandler.bind(this);
        this.toggleButtonState = this.toggleButtonState.bind(this);
        this.resetValidation = this.resetValidation.bind(this);
    }
    enable() {
        this._inputElementList.forEach(inputElement => this._setInputElementHandlers(inputElement));
    }
    _setInputElementHandlers(inputElement) {
        inputElement.addEventListener('input', this._inputElementValidationHandler);
        inputElement.addEventListener('input', this.toggleButtonState);
    }
    // handlers
    _inputElementValidationHandler(evt) {
        const inputElement = evt.target;
        const spanError = document.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._formInputElementShowError(inputElement, spanError);
        } else {
            this._formInputElementHideError(inputElement, spanError);
        }
    }
    _formInputElementShowError(inputElement, spanErrorElement) {
        inputElement.classList.add(this._inputErrorClass);
        spanErrorElement.classList.add(this._inputSpanErrorClass);
        spanErrorElement.textContent = inputElement.validationMessage;
    }
    _formInputElementHideError(inputElement, spanErrorElement) {
        inputElement.classList.remove(this._inputErrorClass);
        spanErrorElement.classList.remove(this._inputSpanErrorClass);
        spanErrorElement.textContent = '';
    }
    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }
    resetValidation() {
      this.toggleButtonState();

      this._inputElementList.forEach(inputElement => {
        if (inputElement.value === '') {
            const spanError = document.querySelector(`#${inputElement.id}-error`);
            this._formInputElementHideError(inputElement, spanError)
        }});

    }
    _hasInvalidInput() {
        return this._inputElementList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }
}
