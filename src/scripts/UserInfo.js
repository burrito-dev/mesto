

export default class UserInfo {
    constructor({userNameSelector, userCaptionSelector, userAvatarSelector}) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userCaptionElement = document.querySelector(userCaptionSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
        this._id = null;

    }
    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            caption: this._userCaptionElement.textContent,
            avatar: this._userAvatarElement.src
        }
    }
    setUserInfo({name, about, avatar, _id}) {
        this._userNameElement.textContent = name;
        this._userCaptionElement.textContent = about;
        if (avatar) {
            this._userAvatarElement.src = avatar;
        }
        if (_id) {
            this._id = _id
        }
    }
    getId() {
        return this._id;
    }
}