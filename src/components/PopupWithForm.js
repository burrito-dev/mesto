import Popup from "./Popup.js";
import {inputFieldsMapping, formSettings} from "../utils/consts.js";


export default class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitForm, onOpen) {
        super(popupSelector);
        this._onSubmitForm = onSubmitForm;
        this._form = this._popupElement.querySelector(formSettings.formSelector);
        this._inputList = this._popupElement.querySelectorAll(formSettings.formInputSelector);
        this._onOpen = onOpen;
        this._submitButton = this._popupElement.querySelector(formSettings.formSubmitButtonSelector);
        this._defaultSubmitButtonText = this._submitButton.textContent;
        this.setEventListeners();
        this.changeButtonText = this.changeButtonText.bind(this);
    }
    open(data) {
        super.open();
        this._onOpen(data);
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
    changeButtonText(text) {
        if (text) {
            this._submitButton.textContent = text;
        } else {
            this._submitButton.textContent = this._defaultSubmitButtonText;
        }
    }
}