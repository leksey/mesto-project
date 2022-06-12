const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: '9604af3d-5a7c-4d72-b14c-31174b7ac9d5',
    'Content-Type': 'application/json'
  }
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      return responseHandler(res);
    });
};

const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      return responseHandler(res);
    });
};

const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      return responseHandler(res);
    });
}


const publishCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      return responseHandler(res);
    });
}

const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      return responseHandler(res);
    });
}

const likeCard = (action, id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: action,
    headers: config.headers
  })
    .then(res => {
      return responseHandler(res);
    });
}

const editAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(res => {
      return responseHandler(res);
    });
}

function responseHandler (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {getInitialCards, getProfileData, editProfile, publishCard, deleteCard, likeCard, editAvatar};
