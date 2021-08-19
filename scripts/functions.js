import {
    createElementForm,
    createElementImgLinkInput,
    createElementNameInput, createElementPopUp,
    editProfileJobInput,
    editProfileNameInput,
    editProfilePopUp,
    profileJob,
    profileName
} from "./consts.js";
import {addNewElement} from "./Card.js"

function hasInvalidInput(inputElementList) {
    return inputElementList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}


function toggleButtonState(inputElementList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputElementList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function toggleButtonStateFromPopUp(popUpElement) {
    const inputElementList = Array.from(popUpElement.querySelectorAll('.edit-form__text-input'));
    const buttonElement = popUpElement.querySelector('.edit-form__submit-button');
    toggleButtonState(inputElementList, buttonElement, 'edit-form__submit-button_disabled');
}


function submitEditProfileFormHandler (evt) {
    evt.preventDefault();
    profileName.textContent = editProfileNameInput.value;
    profileJob.textContent = editProfileJobInput.value;
    closePopUp(evt.target.closest('.pop-up'));
}



function openEditProfileFormHandler() {
    editProfileNameInput.value = profileName.textContent;
    editProfileJobInput.value = profileJob.textContent;
    openPopUp(editProfilePopUp);
    toggleButtonStateFromPopUp(editProfilePopUp);

}



function openPopUp(popUpElement) {
    popUpElement.classList.add('pop-up_opened');
    document.addEventListener('keydown', closeFormOnEscapeHandler);
    popUpElement.addEventListener('click', closePopUpOnClickHandler);
}


function closePopUp(popUpElement) {
    popUpElement.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', closeFormOnEscapeHandler);
    popUpElement.removeEventListener('click', closePopUpOnClickHandler);
}


function closePopUpHandler(evt) {
    closePopUp(document.querySelector('.pop-up_opened'));
}


function submitCreateElementFormHandler(evt) {
    evt.preventDefault();
    addNewElement({name: createElementNameInput.value, link: createElementImgLinkInput.value});
    closePopUp(evt.target.closest('.pop-up'));
    createElementForm.reset();
}


function openCreateElementFormHandler() {
    openPopUp(createElementPopUp);
    toggleButtonStateFromPopUp(createElementPopUp);
}


function closeFormOnEscapeHandler(evt) {
    if (evt.key === 'Escape') {
        closePopUpHandler(evt);
    }
}

function closePopUpOnClickHandler(evt) {
    if (evt.target.classList.contains('pop-up')) {
        closePopUpHandler(evt);
    }
}


function setPopUpCommonBehavior(popUpList) {
    popUpList.forEach((popUpElement) => {
        const closeButton = popUpElement.querySelector('.pop-up__close-button');
        closeButton.addEventListener('click', closePopUpHandler);
    })
}

export {
    toggleButtonState,
    openEditProfileFormHandler,
    submitEditProfileFormHandler,
    openCreateElementFormHandler,
    submitCreateElementFormHandler,
    setPopUpCommonBehavior,
    openPopUp
}