

export default class Card {
    constructor({data, handleCardClick}, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._element = this._getElementFromTemplate();
        this._image = this._element.querySelector('.element__image');
        this._title = this._element.querySelector('.element__header');
        this._likeButton = this._element.querySelector('.element__like');
        this._trashButton = this._element.querySelector('.element__trash');
        // handlers
        this._handleCardClick = handleCardClick;
        this._elementLikeHandler = this._elementLikeHandler.bind(this);
        this._elementTrashHandler = this._elementTrashHandler.bind(this);
    }
    create() {
        this._setEventListeners();
        this._image.style.backgroundImage = `url(${this._link})`;
        this._title.textContent = this._name;
        return this._element;
    }
    _setEventListeners() {
        this._likeButton.addEventListener('click', this._elementLikeHandler);
        this._trashButton.addEventListener('click', this._elementTrashHandler);
        this._image.addEventListener('click', this._handleCardClick);

    }
    _getElementFromTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }
    // handlers
    _elementLikeHandler() {
        this._element.classList.toggle('element__like_active');
    }
    _elementTrashHandler() {
        this._element.remove();
    }
}
