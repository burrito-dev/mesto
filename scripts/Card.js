import {imagePopUp, imagePopUpImage, imagePopUpCaption} from './consts.js'
import {openPopUp} from "./functions.js";


export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._element = this._getElementFromTemplate();
        this._image = this._element.querySelector('.element__image');
        this._title = this._element.querySelector('.element__header');
        this._likeButton = this._element.querySelector('.element__like');
        this._trashButton = this._element.querySelector('.element__trash');
        // handlers
        this._elementImageClickHandler = this._elementImageClickHandler.bind(this);
    }
    create() {
        this._setEventListeners();
        this._image.style.backgroundImage = `url(${this._link})`;
        this._title.textContent = this._name;
        return this._element
    }
    _setEventListeners() {
        this._likeButton.addEventListener('click', this._elementLikeHandler);
        this._trashButton.addEventListener('click', this._elementTrashHandler);
        this._image.addEventListener('click', this._elementImageClickHandler);

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
