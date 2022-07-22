export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this.name = document.querySelector(nameSelector);
    this.about = document.querySelector(aboutSelector);
  }
  getUserInfo () {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }
  setUserInfo (name, about, avatar, id) {
    this.name.textContent = name;
    this.about.textContent = about;
    this._avatar.src = avatar;
    this._id = id;
  }
}
s