export default class Card {
    constructor({myUserId, data, handleCardClick, handleTrashClick, handleLikeClick}, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id
        this._ownerId = data.owner._id
        this._myUserId = myUserId
        this._likes = data.likes;
        this._isLiked = false;
        this._templateSelector = templateSelector;
        this._element = this._getElementFromTemplate();
        this._image = this._element.querySelector('.element__image');
        this._title = this._element.querySelector('.element__header');
        this._likeButton = this._element.querySelector('.element__like');
        this._likeCount = this._element.querySelector('.element__like_count');
        this._trashButton = this._element.querySelector('.element__trash');
        // handlers
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
    }
    create() {
        this._setEventListeners();
        this._image.style.backgroundImage = `url(${this._link})`;
        this._title.textContent = this._name;
        this._likeCount.textContent = this._likes.length;
        if (!this._isOwner()) {
            this._trashButton.style.visibility = 'hidden';
        }
        if (this._getIsliked()) {
            this.like(this._likes);
        }
        return this._element;
    }
    remove() {
        this._element.remove();
    }
    getId() {
        return this._id;
    }
    like(likes) {
        this._likes = likes;
        this._likeCount.textContent = this._likes.length;

        this._isLiked = !this._isLiked;
        this._likeButton.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeClick)
        this._image.addEventListener('click', this._handleCardClick);
        if (this._isOwner()) {
            this._trashButton.addEventListener('click', this._handleTrashClick);
        }

    }
    _getElementFromTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }
    // handlers
    _isOwner() {
        return (this._ownerId === this._myUserId)
    }

    _getIsliked() {
        return this._likes.some(user => {
            return user._id === this._myUserId
        })
    }
    isLiked() {
        return this._isLiked;
    }
}
