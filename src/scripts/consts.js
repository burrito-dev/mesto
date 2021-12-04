export const userSelectors = {
    userNameSelector: '.profile__name',
    userCaptionSelector: '.profile__job',
    userAvatarSelector: '.profile__avatar'
}

export const editProfilePopupSelector = '#edit-profile-pop-up';
export const editProfileForm = document.forms.editProfile;
export const editProfileNameInput = editProfileForm.querySelector('.edit-form__text-input_type_name');
export const editProfileJobInput = editProfileForm.querySelector('.edit-form__text-input_type_job');
export const editProfileOpenButton = document.querySelector('.profile__edit-button');

export const editProfileAvatarPopupSelector = '#edit-profile-avatar-pop-up';
export const editProfileAvatarForm = document.forms.editProfileAvatar;
export const editProfileAvatarInput = editProfileAvatarForm.querySelector('.edit-form__text-input_element-avatar-link');
export const editProfileAvatarOpenButton = document.querySelector('.profile__avatar-zone');

export const cardTemplateSelector = '#element-template';
export const cardsContainerSelector = '#elements__list';

export const createCardPopupSelector = '#create-element-pop-up';
export const createCardFormOpenButton = document.querySelector('.profile__add-button');
export const createCardForm = document.forms.createElement;

export const removeElementPopupSelector = '#remove-element-pop-up';


export const formSettings = {
    formSelector: '.edit-form',
    formInputSelector: '.edit-form__text-input',
    formSubmitButtonSelector: '.edit-form__submit-button',
    formInactiveButtonClass: 'edit-form__submit-button_disabled',
    formInputErrorClass: 'edit-form__text-input_error',
    formInputSpanErrorClass: '`edit-form__span-error_active`'
}


export const imagePopupSelector = '#large-image-pop-up';

// id: dataSlug
export const inputFieldsMapping = {
    'create-element-name-input': 'name',
    'create-element-url-input': 'link',
    'edit-profile-name-input': 'name',
    'edit-profile-job-input': 'about',
    'edit-profile-avatar-input': 'avatar'
}

