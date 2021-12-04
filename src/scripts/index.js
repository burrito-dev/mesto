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
} from './consts.js';

import {FormValidator} from "./FormValidator.js";
import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

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

api.getUserInfo().then(userData => {
    userInfo.setUserInfo(userData);
})

api.getInitialCards().then(initialCards => {
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
                    const removeElementPopup = new PopupWithForm(
                        removeElementPopupSelector,
                        (evt) => {
                        evt.preventDefault();
                        removeElementPopup.changeButtonText('Удаление...');
                        api.deleteCard(card.getId())
                            .then(deleteData => {
                                card.remove();
                                removeElementPopup.close();
                                removeElementPopup.changeButtonText();
                            })
                            .catch(removeElementPopup.changeButtonText)
                        },
                        () => {}
                    );
                    removeElementPopup.open()
                },
                handleLikeClick: () => {
                    if (card.isLiked()) {
                        api.dislikeCard(card.getId())
                            .then(data => {
                                card.like(data.likes);
                            })
                            .catch()
                    } else {
                        api.likeCard(card.getId())
                            .then(data => {
                                card.like(data.likes);
                            })
                            .catch()
                    }
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
            createCardPopup.changeButtonText('Сохранение...');
            const cardData = createCardPopup.getInputValues();
            api.postCard(cardData)
                .then(cardData => {
                    cardsSection.renderer(cardData);
                    createCardPopup.close();
                    createCardForm.reset();
                    createCardPopup.changeButtonText();
                })
                .catch(createCardPopup.changeButtonText)
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
            editProfilePopup.changeButtonText('Сохранение...');
            api.setUserInfo(userData)
                .then(userData => {
                    userInfo.setUserInfo(userData);
                    editProfilePopup.close();
                    editProfilePopup.changeButtonText()
                })
                .catch(editProfilePopup.changeButtonText)

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
                    editProfileAvatarPopup.changeButtonText();
                    })
                .catch(editProfileAvatarPopup.changeButtonText)
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

})
createCardFormValidator.enable();
editProfileFormValidator.enable();