
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const editProfilePopUp = document.querySelector('#edit-profile-pop-up');
const editProfileForm = document.forms.editProfile;
const editProfileNameInput = editProfileForm.querySelector('.edit-form__text-input_type_name');
const editProfileJobInput = editProfileForm.querySelector('.edit-form__text-input_type_job');
const editProfileCloseButton = editProfileForm.querySelector('.edit-form__close-button');
const editProfileOpenButton = document.querySelector('.profile__edit-button');

const elements = document.querySelector('#elements__list');

const elementTemplate = document.querySelector('#element-template').content;

const createElementFormOpenButton = document.querySelector('.profile__add-button');
const createElementPopUp = document.querySelector('#create-element-pop-up');
const createElementForm = document.forms.createElement;
const createElementNameInput = createElementForm.querySelector('.edit-form__text-input_type_element-name');
const createElementImgLinkInput = createElementForm.querySelector('.edit-form__text-input_element-img-link');
const createElementFormCloseButton = createElementForm.querySelector('.edit-form__close-button');

const imagePopUp = document.querySelector('#large-image-pop-up');
const imagePopUpImage = imagePopUp.querySelector('.pop-up-figure__image');
const imagePopUpCaption = imagePopUp.querySelector('.pop-up-figure__caption');
const imagePopUpCloseButton = imagePopUp.querySelector('.pop-up-figure__close-button');

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

