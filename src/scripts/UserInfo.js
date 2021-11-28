

export default class UserInfo {
    constructor({userNameSelector, userCaptionSelector, userAvatarSelector}) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userCaptionElement = document.querySelector(userCaptionSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector)

    }
    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            caption: this._userCaptionElement.textContent
        }
    }
    setUserInfo({name, about, avatar}) {
        this._userNameElement.textContent = name;
        this._userCaptionElement.textContent = about;
        if (avatar) {
            this._userAvatarElement.src = avatar;
        }
    }
}