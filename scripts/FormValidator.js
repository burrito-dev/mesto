import {toggleButtonState} from './functions.js'

function formInputElementShowError(inputElement, spanErrorElement, inputErrorClass) {
    inputElement.classList.add(inputErrorClass);
    spanErrorElement.classList.add(`edit-form__span-error_active`);
    spanErrorElement.textContent = inputElement.validationMessage;
}
function formInputElementHideError(inputElement, spanErrorElement, inputErrorClass) {
    inputElement.classList.remove(inputErrorClass);
    spanErrorElement.classList.remove(`edit-form__span-error_active`);
    spanErrorElement.textContent = '';
}


class FormValidator {
    constructor(validationSettings, formElement) {
        // this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inactiveButtonClass = validationSettings.inactiveButtonClass;
        this._inputErrorClass = validationSettings.inputErrorClass;
        // this._errorClass = validationSettings.errorClass;
        this._formElement = formElement;
    }
    enable() {
        const inputElementList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        inputElementList.forEach(inputElement => {
            inputElement.addEventListener('input',this._inputElementValidationHandler);
            inputElement.addEventListener('input', (evt) => {
                toggleButtonState(inputElementList, buttonElement, this._inactiveButtonClass);
            });
        });
    }
    // handlers
    _inputElementValidationHandler(evt) {
        const inputElement = evt.target;
        const spanError = document.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            ((inputElement, spanError) => {
                formInputElementShowError(inputElement, spanError, this._inputErrorClass)
            })(inputElement, spanError);
        } else {
            ((inputElement, spanError) => {
                formInputElementHideError(inputElement, spanError, this._inputErrorClass)
            })(inputElement, spanError);
        }
    }
}

export function enableValidation(validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach(formElement => new FormValidator(validationSettings, formElement).enable());
}
