import '../pages/index.css';
import {
    createCardForm,
    createCardFormOpenButton,
    editProfileOpenButton,
    editProfileForm,
    imagePopupSelector,
    cardsContainerSelector,
    cardTemplateSelector,
    createCardPopupSelector,
    editProfilePopupSelector, userSelectors, formSettings, editProfileNameInput, editProfileJobInput
} from './consts.js';
import {FormValidator} from "./FormValidator.js";
import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

export const editProfileFormValidator = new FormValidator(formSettings, editProfileForm);
export const createCardFormValidator = new FormValidator(formSettings, createCardForm);


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: 'b29e931a-bb8c-4193-9c1e-d03122787d98',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(userSelectors);

api.getUserInfo().then(userData => {
    console.log(userData);
    userInfo.setUserInfo(userData);
})


api.getInitialCards().then(initialCards => {
    console.log(initialCards);
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

    const createCardPopup = new PopupWithForm(
        createCardPopupSelector,
        (evt) => {
            evt.preventDefault();
            const cardData = createCardPopup.getInputValues();
            api.postCard(cardData).then(cardData => {
                if (cardData) {
                    cardsSection.renderer(cardData);
                }
            })
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
            api.setUserInfo(userData)
                .then(userData => {
                    if (userData) {
                        userInfo.setUserInfo(userData);
                    }
                    editProfilePopup.close();
                })
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

})
createCardFormValidator.enable();
editProfileFormValidator.enable();