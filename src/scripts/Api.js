export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _sendRequest(method, path, body) {
        if (body != null) {
            body = JSON.stringify(body);
        }

        return fetch(`${this.baseUrl}/${path}`, {
            method: method,
            headers: this.headers,
            body: body
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                const errorMessage = `Can't ${method} ${path}: ${res.status}`
                console.log(errorMessage)
                return Promise.reject(errorMessage);
            })
            .then(data => {
                return data;
            })
    }
    getInitialCards() {
        return this._sendRequest('GET','cards');
    }
    getUserInfo() {
        return this._sendRequest('GET','users/me');
    }
    setUserInfo(data) {
        return this._sendRequest('PATCH', 'users/me', data);
    }
    postCard(data) {
        return this._sendRequest('POST', 'cards', data);
    }
    deleteCard(cardId) {
        return this._sendRequest('DELETE', `cards/${cardId}`);
    }
    likeCard(cardId) {
        return this._sendRequest('PUT', `cards/${cardId}/likes`);
    }
    dislikeCard(cardId) {
        return this._sendRequest('DELETE', `cards/${cardId}/likes`);
    }
    setUserAvatar(avatar) {
        return this._sendRequest('PATCH', 'users/me/avatar',{avatar});
    }


  // другие методы работы с API
}
