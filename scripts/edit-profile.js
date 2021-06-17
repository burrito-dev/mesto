const popUpElement = document.querySelector('#edit-profile-pop-up');
const formElement = popUpElement.querySelector('.edit-form');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const nameInput = formElement.querySelector('.edit-form__text-input_type_name');
const jobInput = formElement.querySelector('.edit-form__text-input_type_job');

const closeButton = formElement.querySelector('.edit-form__close-button');
const editButton = document.querySelector('.profile__edit-button');

function closeFormHandler () {
    popUpElement.classList.remove('pop-up_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeFormHandler()
}


function openFormHandler () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popUpElement.classList.add('pop-up_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openFormHandler);
closeButton.addEventListener('click', closeFormHandler);
