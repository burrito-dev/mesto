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

function hasInvalidInput(inputElementList) {
    return inputElementList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

function inputElementValidationHandler(evt, inputErrorClass) {
    const inputElement = evt.target;
    const spanError = document.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        formInputElementShowError(inputElement, spanError, inputErrorClass);
    } else {
        formInputElementHideError(inputElement, spanError, inputErrorClass);
    }
}

const toggleButtonState = (inputElementList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputElementList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function enableValidationOnForm(formElement, validationSettings) {
    const inputElementList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    inputElementList.forEach(inputElement => {
        inputElement.addEventListener('input', evt => {
            inputElementValidationHandler(evt, validationSettings.inputErrorClass);
            toggleButtonState(inputElementList, buttonElement, validationSettings.inactiveButtonClass);
        });
    });
}

function enableValidation(validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach(formElement => enableValidationOnForm(formElement, validationSettings));
}

enableValidation({
    formSelector: '.edit-form',
    inputSelector: '.edit-form__text-input',
    submitButtonSelector: '.edit-form__submit-button',
    inactiveButtonClass: 'edit-form__submit-button_disabled',
    inputErrorClass: 'edit-form__text-input_error',
    errorClass: 'pop-up__error_visible'
});
