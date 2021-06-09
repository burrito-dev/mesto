// Находим форму в DOM
let popUpElement = document.querySelector('.pop-up')
let formElement = popUpElement.querySelector('.edit-form')// Воспользуйтесь методом querySelector()
let name = document.querySelector('.profile__name')
let job = document.querySelector('.profile__job')
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.edit-form__name-input')// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.edit-form__job-input')// Воспользуйтесь инструментом .querySelector()
let closeButton = formElement.querySelector('.edit-form__close-button')
let editButton = document.querySelector('.profile__edit-button')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    name.innerHTML = nameInput.value + editButton.outerHTML;
    job.textContent = jobInput.value;
    editButton = document.querySelector('.profile__edit-button')
    editButton.addEventListener('click', openFormHandler);
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
