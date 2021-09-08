

export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.pop-up__close-button');
    }
    open() {
        this._popupElement.classList.add('pop-up_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popupElement.addEventListener('click', this._handleCrossClose.bind(this));
    }
    close() {
        this._popupElement.classList.remove('pop-up_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.removeEventListener('click', this._handleCrossClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.close.bind(this));

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