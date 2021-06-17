// elements template
const elements = document.querySelector('#elements__list');
// profile addButton
const ProfileAddButton = document.querySelector('.profile__add-button');
// template
const elementTemplate = document.querySelector('#element-template').content;
const imagePopUpTemplate = document.querySelector('#large-photo-template').content;
// create element pop-up
const createPopUpElement = document.querySelector('#create-element-pop-up');
const createFormElement = createPopUpElement.querySelector('.edit-form');
const elementNameInput = createFormElement.querySelector('.edit-form__text-input_type_element-name');
const imgLinkInput = createFormElement.querySelector('.edit-form__text-input_element-img-link');
const createFormCloseButton = createFormElement.querySelector('.edit-form__close-button');

const page = document.querySelector('.page')


function elementLikeHandler(evt) {
    evt.target.classList.toggle('element__like_active')
}


function elementTrashHandler(evt) {
    evt.target.parentElement.remove();
}

function imagePopUpCloseHandler(evt) {
    evt.target.parentElement.parentElement.classList.remove('pop-up_opened');
}

function addLargePopUp(element, name, link) {
    const popUp = imagePopUpTemplate.querySelector('.pop-up').cloneNode(true);
    popUp.style.zIndex = '1';
    popUp.querySelector('.pop-up-figure__close-button').addEventListener('click', imagePopUpCloseHandler);
    popUp.querySelector('.pop-up-figure__image').src = link;
    popUp.querySelector('.pop-up-figure__caption').textContent = name;
    element.append(popUp);
}

function elementImageClickHandler(evt) {
    evt.target.parentElement.querySelector('.pop-up').classList.add('pop-up_opened');
}

function addNewElement(name, link) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);

    element.querySelector('.element__like').addEventListener('click', elementLikeHandler);
    element.querySelector('.element__trash').addEventListener('click', elementTrashHandler);
    element.querySelector('.element__image').addEventListener('click', elementImageClickHandler);
    element.querySelector('.element__image').style.backgroundImage = `url(${link})`;
    element.querySelector('.element__header').textContent = name;

    addLargePopUp(element, name, link);

    elements.append(element);
}


function closeAddFormHandler() {
    createPopUpElement.classList.remove('pop-up_opened');
}


function createFormSubmitHandler(evt) {
    evt.preventDefault();
    addNewElement(elementNameInput.value, imgLinkInput.value);
    closeAddFormHandler()
}


function openAddFormHandler() {
    createPopUpElement.classList.add('pop-up_opened');
}

ProfileAddButton.addEventListener('click', openAddFormHandler);

createFormElement.addEventListener('submit', createFormSubmitHandler);
createFormCloseButton.addEventListener('click', closeAddFormHandler);

// init elements

function initElements() {
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];
    initialCards.forEach(value => addNewElement(value.name, value.link))
}
initElements();
