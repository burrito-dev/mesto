import './index.css';
import {
    createCardForm,
    createCardFormOpenButton,
    editProfileOpenButton,
    editProfileForm,
    imagePopupSelector,
    cardsContainerSelector,
    cardTemplateSelector,
    createCardPopupSelector,
    removeElementPopupSelector,
    editProfileAvatarPopupSelector,
    editProfilePopupSelector,
    editProfileAvatarForm,
    editProfileAvatarOpenButton,
    userSelectors,
    formSettings,
    editProfileNameInput,
    editProfileJobInput,
    editProfileAvatarInput
} from '../utils/consts.js';

import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

export const editProfileFormValidator = new FormValidator(formSettings, editProfileForm);
export const editProfileAvatarFormValidator = new FormValidator(formSettings, editProfileAvatarForm);
export const createCardFormValidator = new FormValidator(formSettings, createCardForm);


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: 'b29e931a-bb8c-4193-9c1e-d03122787d98',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(userSelectors);

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
    ([userData, initialCards]) => {
        userInfo.setUserInfo(userData);

    const removeElementPopup = new PopupWithForm(
        removeElementPopupSelector,
        (evt) => {
        evt.preventDefault();
        removeElementPopup.changeButtonText('Удаление...');
        api.deleteCard(removeElementPopup.card.getId())
            .then(deleteData => {
                removeElementPopup.card.remove();
                removeElementPopup.close();
            })
            .catch(console.log)
            .finally(removeElementPopup.changeButtonText)
        },
        (card) => {
            removeElementPopup.card = card;
        }
    );
    const cardsSection = new Section({
        items: initialCards.reverse(),
        renderer: (cardData) => {
            const card = new Card({
                myUserId: userInfo.getId(),
                data: cardData,
                handleCardClick: () => {
                    popupWithImage.open(cardData);
                },
                handleTrashClick: () => {
                    removeElementPopup.open(card)
                },
                handleLikeClick: () => {
                    if (card.isLiked()) {
                        api.dislikeCard(card.getId())
                            .then(data => {
                                card.like(data.likes);
                            })
                            .catch(console.log)
                    } else {
                        api.likeCard(card.getId())
                            .then(data => {
                                card.like(data.likes);
                            })
                            .catch(console.log)
                    }
                }
            }, cardTemplateSelector);
            return card.create();
        }
    }, cardsContainerSelector);
    cardsSection.renderItems();

    const createCardPopup = new PopupWithForm(
        createCardPopupSelector,
        (evt) => {
            evt.preventDefault();
            createCardPopup.changeButtonText('Сохранение...');
            const cardData = createCardPopup.getInputValues();
            api.postCard(cardData)
                .then(cardData => {
                    cardsSection.addItem(cardData);
                    createCardPopup.close();
                    createCardForm.reset();
                })
                .catch(console.log)
                .finally(createCardPopup.changeButtonText)
        },
        () => {
            createCardFormValidator.resetValidation();
        }
    );

    const editProfilePopup = new PopupWithForm(
        editProfilePopupSelector,
        (evt) => {
            evt.preventDefault();
            const userData = editProfilePopup.getInputValues();
            editProfilePopup.changeButtonText('Сохранение...');
            api.setUserInfo(userData)
                .then(userData => {
                    userInfo.setUserInfo(userData);
                    editProfilePopup.close();
                })
                .catch(console.log)
                .finally(editProfilePopup.changeButtonText)

        },
        () => {
            const userData = userInfo.getUserInfo();
            editProfileNameInput.value = userData.name;
            editProfileJobInput.value = userData.caption;
            editProfileFormValidator.toggleButtonState();
        }
    );
    const editProfileAvatarPopup = new PopupWithForm(
        editProfileAvatarPopupSelector,
        (evt) => {
            evt.preventDefault();
            const userData = editProfileAvatarPopup.getInputValues();
            editProfileAvatarPopup.changeButtonText('Сохранение...');
            api.setUserAvatar(userData.avatar)
                .then(userData => {
                    userInfo.setUserInfo(userData);
                    editProfileAvatarPopup.close();
                    })
                .catch(console.log)
                .finally(editProfileAvatarPopup.changeButtonText)
        },
        () => {
            const userData = userInfo.getUserInfo();
            editProfileAvatarInput.value = userData.avatar;
            editProfileAvatarFormValidator.toggleButtonState();
        }
    );
    editProfileOpenButton.addEventListener('click', editProfilePopup.open.bind(editProfilePopup));
    editProfileAvatarOpenButton.addEventListener('click', editProfileAvatarPopup.open.bind(editProfileAvatarPopup));


    createCardFormOpenButton.addEventListener('click', createCardPopup.open.bind(createCardPopup));


    const popupWithImage = new PopupWithImage(imagePopupSelector);

}).catch(console.log);
createCardFormValidator.enable();
editProfileFormValidator.enable();
editProfileAvatarFormValidator.enable();