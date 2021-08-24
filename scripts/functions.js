import {
    createElementForm,
    createElementFormValidator,
    createElementImgLinkInput,
    createElementNameInput, createElementPopUp,
    editProfileFormValidator,
    editProfileJobInput,
    editProfileNameInput,
    editProfilePopUp, elements, initialCards,
    profileJob,
    profileName
} from "./consts.js";
import {Card} from "./Card.js"

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
    editProfileFormValidator.toggleButtonState()
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
    createElementFormValidator.toggleButtonState()
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

// init elements
function extendElements(element) {
    elements.prepend(element);
}
function addNewElement(elementObj) {
    extendElements(new Card(elementObj, '#element-template').create());
}
function initElements() {
    initialCards.forEach(value => addNewElement(value))
}

export {
    openEditProfileFormHandler,
    submitEditProfileFormHandler,
    openCreateElementFormHandler,
    submitCreateElementFormHandler,
    setPopUpCommonBehavior,
    openPopUp,
    initElements
}