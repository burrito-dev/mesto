import {
    createElementForm, editProfileOpenButton, editProfileForm, createElementFormOpenButton
} from './consts.js'
import {
    openEditProfileFormHandler,
    submitEditProfileFormHandler,
    openCreateElementFormHandler,
    submitCreateElementFormHandler,
    setPopUpCommonBehavior
} from './functions.js'
import {enableValidation} from "./FormValidator.js";
import {initElements} from "./Card.js";

editProfileOpenButton.addEventListener('click', openEditProfileFormHandler);
editProfileForm.addEventListener('submit', submitEditProfileFormHandler);


createElementFormOpenButton.addEventListener('click', openCreateElementFormHandler);
createElementForm.addEventListener('submit', submitCreateElementFormHandler);


setPopUpCommonBehavior(Array.from(document.querySelectorAll('.pop-up')));
initElements();

enableValidation({
    formSelector: '.edit-form',
    inputSelector: '.edit-form__text-input',
    submitButtonSelector: '.edit-form__submit-button',
    inactiveButtonClass: 'edit-form__submit-button_disabled',
    inputErrorClass: 'edit-form__text-input_error',
    errorClass: 'pop-up__error_visible'
});
