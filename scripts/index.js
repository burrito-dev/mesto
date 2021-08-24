import {
    createElementForm, createElementFormValidator, createElementFormOpenButton,
    editProfileFormValidator, editProfileOpenButton, editProfileForm
} from './consts.js'
import {
    openEditProfileFormHandler,
    submitEditProfileFormHandler,
    openCreateElementFormHandler,
    submitCreateElementFormHandler,
    setPopUpCommonBehavior,
    initElements
} from './functions.js'

editProfileOpenButton.addEventListener('click', openEditProfileFormHandler);
editProfileForm.addEventListener('submit', submitEditProfileFormHandler);


createElementFormOpenButton.addEventListener('click', openCreateElementFormHandler);
createElementForm.addEventListener('submit', submitCreateElementFormHandler);


setPopUpCommonBehavior(Array.from(document.querySelectorAll('.pop-up')));
initElements();

createElementFormValidator.enable();
editProfileFormValidator.enable();