import Popup from "./Popup.js";
import {inputFieldsMapping, formSettings} from "./consts.js";


export default class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitForm, onOpen) {
        super(popupSelector);
        this._onSubmitForm = onSubmitForm;
        this._form = this._popupElement.querySelector(formSettings.formSelector);
        this._inputList = this._popupElement.querySelectorAll(formSettings.formInputSelector);
        this._onOpen = onOpen;
        this.setEventListeners();
    }
    open() {
        super.open();
        this._onOpen();
    }
    getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[inputFieldsMapping[input.id]] = input.value;
        })
        return inputValues;
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', this._onSubmitForm);
    }
}