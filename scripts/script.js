function submitEditProfileFormHandler (evt) {
    evt.preventDefault();
    profileName.textContent = editProfileNameInput.value;
    profileJob.textContent = editProfileJobInput.value;
    closePopUp(evt.target.closest('.pop-up'));
}


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

}


function elementLikeHandler(evt) {
    evt.target.classList.toggle('element__like_active')
}


function elementTrashHandler(evt) {
    evt.target.closest('.element').remove();
}


function openLargePhoto(imgSrc, caption) {
    imagePopUpImage.src = imgSrc;
    imagePopUpCaption.textContent = caption;
    openPopUp(imagePopUp);
}


function elementImageClickHandler(evt) {
    const element = evt.target.closest('.element');
    const elementImageUrl = evt.target.style.backgroundImage.slice(5,-2);
    const elementImageCaption = element.querySelector('.element__caption').textContent;
    openLargePhoto(elementImageUrl, elementImageCaption);
}


function createNewElement(elementObj) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);

    element.querySelector('.element__like').addEventListener('click', elementLikeHandler);
    element.querySelector('.element__trash').addEventListener('click', elementTrashHandler);
    element.querySelector('.element__image').addEventListener('click', elementImageClickHandler);
    element.querySelector('.element__image').style.backgroundImage = `url(${elementObj.link})`;
    element.querySelector('.element__header').textContent = elementObj.name;
    return element
}


function extendElements(element) {
    elements.prepend(element);
}


function addNewElement(elementObj) {
    extendElements(createNewElement(elementObj));
}

function openPopUp(popUpElement) {
    popUpElement.classList.add('pop-up_opened');
    popUpElement.addEventListener('keydown', closeFormOnEscapeHandler);
    popUpElement.addEventListener('click', closePopUpOnClickHandler);
}


function closePopUp(popUpElement) {
    popUpElement.classList.remove('pop-up_opened');
    popUpElement.removeEventListener('keydown', closeFormOnEscapeHandler);
    popUpElement.removeEventListener('click', closePopUpOnClickHandler);
}


function closePopUpHandler(evt) {
    closePopUp(evt.target.closest('.pop-up'));
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

// init elements
function initElements() {
    initialCards.forEach(value => addNewElement(value))
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


editProfileOpenButton.addEventListener('click', openEditProfileFormHandler);
editProfileForm.addEventListener('submit', submitEditProfileFormHandler);


createElementFormOpenButton.addEventListener('click', openCreateElementFormHandler);
createElementForm.addEventListener('submit', submitCreateElementFormHandler);

imagePopUp.addEventListener('keydown', closeFormOnEscapeHandler);
imagePopUp.addEventListener('click', closePopUpOnClickHandler);
imagePopUpCloseButton.addEventListener('click', closePopUpHandler)

setPopUpCommonBehavior(Array.from(document.querySelectorAll('.pop-up')));
initElements();
