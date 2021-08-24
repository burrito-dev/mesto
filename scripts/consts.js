export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const editProfilePopUp = document.querySelector('#edit-profile-pop-up');
export const editProfileForm = document.forms.editProfile;
export const editProfileNameInput = editProfileForm.querySelector('.edit-form__text-input_type_name');
export const editProfileJobInput = editProfileForm.querySelector('.edit-form__text-input_type_job');
export const editProfileOpenButton = document.querySelector('.profile__edit-button');

export const elements = document.querySelector('#elements__list');

export const createElementFormOpenButton = document.querySelector('.profile__add-button');
export const createElementPopUp = document.querySelector('#create-element-pop-up');
export const createElementForm = document.forms.createElement;
export const createElementNameInput = createElementForm.querySelector('.edit-form__text-input_type_element-name');
export const createElementImgLinkInput = createElementForm.querySelector('.edit-form__text-input_element-img-link');

export const imagePopUp = document.querySelector('#large-image-pop-up');
export const imagePopUpImage = imagePopUp.querySelector('.pop-up-figure__image');
export const imagePopUpCaption = imagePopUp.querySelector('.pop-up-figure__caption');

export const initialCards = [
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

