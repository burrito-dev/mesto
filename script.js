
let popUpElement = document.querySelector('.pop-up')
let formElement = popUpElement.querySelector('.edit-form')

let name = document.querySelector('.profile__name')
let job = document.querySelector('.profile__job')

let nameInput = formElement.querySelector('.edit-form__name-input')
let jobInput = formElement.querySelector('.edit-form__job-input')

let closeButton = formElement.querySelector('.edit-form__close-button')
let editButton = document.querySelector('.profile__edit-button')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    name.innerHTML = nameInput.value;
    job.textContent = jobInput.value;
    popUpElement.classList.remove('pop-up_opened');
}

function closeFormHandler (evt) {
    popUpElement.classList.remove('pop-up_opened');
}
function openFormHandler (evt) {
    popUpElement.classList.add('pop-up_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openFormHandler);
closeButton.addEventListener('click', closeFormHandler);
