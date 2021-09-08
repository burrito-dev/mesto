import {
    createCardForm,
    createCardFormOpenButton,
    editProfileOpenButton,
    editProfileForm,
    initialCards,
    imagePopupSelector,
    cardsContainerSelector,
    cardTemplateSelector,
    createCardPopupSelector,
    editProfilePopupSelector, userData, formSettings, editProfileNameInput, editProfileJobInput
} from './consts.js';
import {FormValidator} from "./FormValidator.js";
import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js";


export const editProfileFormValidator = new FormValidator(formSettings, editProfileForm);

export const createCardFormValidator = new FormValidator(formSettings, createCardForm);

const userInfo = new UserInfo(userData);

const createCardPopup = new PopupWithForm(
    createCardPopupSelector,
    (evt) => {
        evt.preventDefault();
        const cardData = createCardPopup.getInputValues()
        cardsSection.renderer(cardData);
        createCardPopup.close();
        createCardForm.reset();
    },
    () => {
        createCardFormValidator.toggleButtonState();
    }
);

const editProfilePopup = new PopupWithForm(
    editProfilePopupSelector,
    (evt) => {
        evt.preventDefault();
        const userData = editProfilePopup.getInputValues();
        userInfo.setUserInfo(userData);
        editProfilePopup.close();
    },
    () => {
        const userData = userInfo.getUserInfo();
        editProfileNameInput.value = userData.name;
        editProfileJobInput.value = userData.caption;
        editProfileFormValidator.toggleButtonState();
    }
);
editProfileOpenButton.addEventListener('click', editProfilePopup.open.bind(editProfilePopup));


createCardFormOpenButton.addEventListener('click', createCardPopup.open.bind(createCardPopup));


const popupWithImage = new PopupWithImage(imagePopupSelector);


const cardsSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = new Card({
            data: cardData,
            handleCardClick: () => {
                popupWithImage.open(cardData);
            }
        }, cardTemplateSelector);
        const cardElement = card.create();
        cardsSection.addItem(cardElement, true);
    }
}, cardsContainerSelector);
cardsSection.renderItems();

createCardFormValidator.enable();
editProfileFormValidator.enable();