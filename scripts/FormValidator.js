export class FormValidator {
    constructor(validationSettings, formElement) {
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inactiveButtonClass = validationSettings.inactiveButtonClass;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._inputSpanErrorClass = validationSettings.inputSpanErrorClass;
        this._formElement = formElement;
        this._inputElementList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        // handlers
        this._inputElementValidationHandler = this._inputElementValidationHandler.bind(this);
        this.toggleButtonState = this.toggleButtonState.bind(this);
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
    _hasInvalidInput() {
        return this._inputElementList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }
}
