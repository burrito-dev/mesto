let popUpElement = document.querySelector('.pop-up')
let formElement = popUpElement.querySelector('.edit-form')

let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')

let nameInput = formElement.querySelector('.edit-form__text-input_type_name')
let jobInput = formElement.querySelector('.edit-form__text-input_type_job')

let closeButton = formElement.querySelector('.edit-form__close-button')
let editButton = document.querySelector('.profile__edit-button')

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
