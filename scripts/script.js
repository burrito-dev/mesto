function submitEditProfileFormHandler (evt) {
    evt.preventDefault();
    profileName.textContent = editProfileNameInput.value;
    profileJob.textContent = editProfileJobInput.value;
    closePopUpHandler(evt)
}


function openEditProfileFormHandler() {
    editProfileNameInput.value = profileName.textContent;
    editProfileJobInput.value = profileJob.textContent;
    openPopUp(editProfilePopUp);
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


function addElement(element) {
    elements.prepend(element);
}


function addNewElement(name, link) {
    addElement(createNewElement(name, link));
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
    createElementNameInput.value = '';
    createElementImgLinkInput.value = '';
}


function openCreateElementFormHandler() {
    openPopUp(createElementPopUp);
}

// init elements
function initElements() {
    initialCards.forEach(value => addNewElement(value.name, value.link))
}


editProfileOpenButton.addEventListener('click', openEditProfileFormHandler);
editProfileForm.addEventListener('submit', submitEditProfileFormHandler);
editProfileCloseButton.addEventListener('click', closePopUpHandler);


createElementFormOpenButton.addEventListener('click', openCreateElementFormHandler);
createElementForm.addEventListener('submit', submitCreateElementFormHandler);
createElementFormCloseButton.addEventListener('click', closePopUpHandler);

imagePopUpCloseButton.addEventListener('click', closePopUpHandler)

initElements();