import {imagePopUp, imagePopUpImage, imagePopUpCaption, elements, initialCards} from './consts.js'
import {openPopUp} from "./functions.js";

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }
    create() {
        const element = this._getElementFromTemplate()

        element.querySelector('.element__like').addEventListener('click', this._elementLikeHandler);
        element.querySelector('.element__trash').addEventListener('click', this._elementTrashHandler);
        element.querySelector('.element__image').addEventListener('click', this._elementImageClickHandler);
        element.querySelector('.element__image').style.backgroundImage = `url(${this._link})`;
        element.querySelector('.element__header').textContent = this._name;
        return element
    }
    _getElementFromTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }
    // handlers
    _elementLikeHandler(evt) {
        evt.target.classList.toggle('element__like_active')
    }
    _elementTrashHandler(evt) {
        evt.target.closest('.element').remove();
    }
    _elementImageClickHandler(evt) {
        imagePopUpImage.src = this._link;
        imagePopUpImage.alt = this._name;
        imagePopUpCaption.textContent = this._name;
        openPopUp(imagePopUp);
    }
}

// init elements
function extendElements(element) {
    elements.prepend(element);
}
export function addNewElement(elementObj) {
    extendElements(new Card(elementObj, '#element-template').create());
}
export function initElements() {
    initialCards.forEach(value => addNewElement(value))
}