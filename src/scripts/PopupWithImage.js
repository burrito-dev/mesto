import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector('.pop-up-figure__image');
        this._caption = this._popupElement.querySelector('.pop-up-figure__caption');
        this.setEventListeners();
    }

    open({link, name}) {
        this._image.src = link;
        this._image.alt = name;
        this._caption.textContent = name;
        super.open();
    }
}