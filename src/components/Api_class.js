export default class Api {
  constructor({url, header}){
    this._url=url;
    this._header=header;
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._header
    })
      .then(res => {
        return this._handleResponse(res);
      });
  };

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        return this._handleResponse(res);
      });
  }

  editAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        return this._handleResponse(res);
      });
  }

  // CARDS

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._header
    })
      .then(res => {
        return this._handleResponse(res);
      });
  };

  publishCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        return this._handleResponse(res);
      });
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._header
    })
      .then(res => {
        return this._handleResponse(res);
      });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._header
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
