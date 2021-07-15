function submitEditProfileFormHandler (evt) {
    evt.preventDefault();
    profileName.textContent = editProfileNameInput.value;
    profileJob.textContent = editProfileJobInput.value;
    closePopUpHandler(evt)
}

// function selectFirstInput(object) {
//     const inputField = object.querySelector('.edit-form__text-input');
//     inputField.focus();
//     inputField.select();
// }

function toggleButtonStateFromPopUp(popUpElement) {
    const inputElementList = Array.from(popUpElement.querySelectorAll('.edit-form__text-input'));
    const buttonElement = popUpElement.querySelector('.edit-form__submit-button');
    toggleButtonState(inputElementList, buttonElement, 'edit-form__submit-button_disabled');
}
function openEditProfileFormHandler() {
    editProfileNameInput.value = profileName.textContent;
    editProfileJobInput.value = profileJob.textContent;
    openPopUp(editProfilePopUp);
    toggleButtonStateFromPopUp(editProfilePopUp);
    // selectFirstInput(editProfilePopUp);

}


function elementLikeHandler(evt) {
    evt.target.classList.toggle('element__like_active')
}


function elementTrashHandler(evt) {
    evt.target.closest('.element').remove();
}


function openLargePhoto(img_src, caption) {
    imagePopUpImage.src = img_src;
    imagePopUpCaption.textContent = caption;
    openPopUp(imagePopUp);
    toggleButtonStateFromPopUp(editProfilePopUp);
}


function elementImageClickHandler(evt) {
    const element = evt.target.closest('.element');
    const element_image_url = evt.target.style.backgroundImage.slice(5,-2);
    const element_image_caption = element.querySelector('.element__caption').textContent;
    openLargePhoto(element_image_url, element_image_caption);
}


function createNewElement(name, link) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);

    element.querySelector('.element__like').addEventListener('click', elementLikeHandler);
    element.querySelector('.element__trash').addEventListener('click', elementTrashHandler);
    element.querySelector('.element__image').addEventListener('click', elementImageClickHandler);
    element.querySelector('.element__image').style.backgroundImage = `url(${link})`;
    element.querySelector('.element__header').textContent = name;
    return element
}


function extendElements(element) {
    elements.prepend(element);
}


function addNewElement(name, link) {
    extendElements(createNewElement(name, link));
}

function openPopUp(popUp) {
    popUp.classList.add('pop-up_opened');
}


function closePopUp(popUp) {
    popUp.classList.remove('pop-up_opened');
}


function closePopUpHandler(evt) {
    closePopUp(evt.target.closest('.pop-up'));
}


function submitCreateElementFormHandler(evt) {
    evt.preventDefault();
    addNewElement(createElementNameInput.value, createElementImgLinkInput.value);
    closePopUpHandler(evt);
    createElementForm.reset();
}


function openCreateElementFormHandler() {
    openPopUp(createElementPopUp);
    toggleButtonStateFromPopUp(createElementPopUp);
    // selectFirstInput(createElementPopUp);
}

// init elements
function initElements() {
    initialCards.forEach(value => addNewElement(value.name, value.link))
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


function setFormsCommonBehavior(formList) {
    formList.forEach((formElement) => {
        const closeButton = formElement.querySelector('.edit-form__close-button');
        // close PopUp by clicking
        closeButton.addEventListener('click', closePopUpHandler);
        formElement.closest('.pop-up').addEventListener('keydown', closeFormOnEscapeHandler);
        formElement.closest('.pop-up').addEventListener('click', closePopUpOnClickHandler);
    })
}


editProfileOpenButton.addEventListener('click', openEditProfileFormHandler);
editProfileForm.addEventListener('submit', submitEditProfileFormHandler);


createElementFormOpenButton.addEventListener('click', openCreateElementFormHandler);
createElementForm.addEventListener('submit', submitCreateElementFormHandler);

imagePopUp.addEventListener('keydown', closeFormOnEscapeHandler);
imagePopUp.addEventListener('click', closePopUpOnClickHandler);
imagePopUpCloseButton.addEventListener('click', closePopUpHandler)

setFormsCommonBehavior(Array.from(document.forms));
initElements();
