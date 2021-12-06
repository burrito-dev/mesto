

export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.pop-up__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleCrossClose = this._handleCrossClose.bind(this);
        this.close = this.close.bind(this);
    }
    open() {
        this._popupElement.classList.add('pop-up_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupElement.addEventListener('click', this._handleCrossClose);
    }
    close() {
        this._popupElement.classList.remove('pop-up_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.removeEventListener('click', this._handleCrossClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('mousedown', this.close);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _handleCrossClose(evt) {
        if (evt.target.classList.contains('pop-up')) {
            this.close();
        }
    }
}