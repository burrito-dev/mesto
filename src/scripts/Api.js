export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _sendRequest(method, path, errorData, body) {
        if (body != null) {
            body = JSON.stringify(body)
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
                return Promise.reject(`Can't update ${path}: ${res.status}`);
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error(error);
                return errorData;
            })
    }
    getInitialCards() {
        return this._sendRequest('GET','cards', [])
    }
    getUserInfo() {
        return this._sendRequest('GET','users/me', {})
    }
    setUserInfo(data) {
        return this._sendRequest('PATCH', 'users/me',  {}, data)
    }
    postCard(data) {
        return this._sendRequest('POST', 'cards',  {}, data)
    }


  // другие методы работы с API
}
