export default class Api {
    constructor({url, header}){
      this.url=url; //TODO: anonymouse?
      this.header=header;
    }

    getInitialCards() {
      return fetch(`${this.url}/cards`, {
        headers: this.header
      })
        .then(res => {
          return this._handleResponse(res);
        });
    };

    getProfileData() {
      return fetch(`${this.url}/users/me`, {
        headers: this.header
      })
        .then(res => {
          return this._handleResponse(res);
        });
    };

    editProfile(name, about) {
      return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this.header,
        body: JSON.stringify({
          name: name, // нужен ли this.
          about: about
        })
      })
        .then(res => {
          return this._handleResponse(res);
        });
    }

    publishCard(name, link) {
      return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this.header,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
        .then(res => {
          return this._handleResponse(res);
        });
    }

    deleteCard(id) {
      return fetch(`${this.url}/cards/${id}`, {
        method: 'DELETE',
        headers: this.header
      })
        .then(res => {
          return this._handleResponse(res);
        });
    }

    likeCard(action, id) {
      return fetch(`${this.url}/cards/likes/${id}`, {
        method: action,
        headers: this.header
      })
        .then(res => {
          return this._handleResponse(res);
        });
    }

    editAvatar(link) {
      return fetch(`${this.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.header,
        body: JSON.stringify({
          avatar: link
        })
      })
        .then(res => {
          return this._handleResponse(res);
        });
    }

    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
