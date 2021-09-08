

export default class UserInfo {
    constructor({userNameSelector, userCaptionSelector}) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userCaptionElement = document.querySelector(userCaptionSelector);

    }
    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            caption: this._userCaptionElement.textContent
        }
    }
    setUserInfo({name, caption}) {
        this._userNameElement.textContent = name;
        this._userCaptionElement.textContent = caption;
    }
}