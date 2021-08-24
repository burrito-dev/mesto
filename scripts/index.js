import {
    createElementForm, createElementFormOpenButton,
    editProfileOpenButton, editProfileForm
} from './consts.js'
import {
    openEditProfileFormHandler,
    submitEditProfileFormHandler,
    openCreateElementFormHandler,
    submitCreateElementFormHandler,
    setPopUpCommonBehavior,
    initElements
} from './functions.js'
import {FormValidator} from "./FormValidator.js";

export const editProfileFormValidator = new FormValidator({
    inputSelector: '.edit-form__text-input',
    submitButtonSelector: '.edit-form__submit-button',
    inactiveButtonClass: 'edit-form__submit-button_disabled',
    inputErrorClass: 'edit-form__text-input_error',
    inputSpanErrorClass: '`edit-form__span-error_active`'
}, editProfileForm);

export const createElementFormValidator = new FormValidator({
    inputSelector: '.edit-form__text-input',
    submitButtonSelector: '.edit-form__submit-button',
    inactiveButtonClass: 'edit-form__submit-button_disabled',
    inputErrorClass: 'edit-form__text-input_error',
    inputSpanErrorClass: '`edit-form__span-error_active`'
}, createElementForm);

editProfileOpenButton.addEventListener('click', openEditProfileFormHandler);
editProfileForm.addEventListener('submit', submitEditProfileFormHandler);


createElementFormOpenButton.addEventListener('click', openCreateElementFormHandler);
createElementForm.addEventListener('submit', submitCreateElementFormHandler);


setPopUpCommonBehavior(Array.from(document.querySelectorAll('.pop-up')));
initElements();

createElementFormValidator.enable();
editProfileFormValidator.enable();