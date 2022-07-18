export default class UserInfo {
    constructor({ nameSelector, aboutSelector, getProfileData, setUserInfo, editAvatar}){
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
        this._getProfileData = getProfileData;
        this._setUserInfo = setUserInfo;
        this._editAvatar = editAvatar;
    }

    _setProfileData (data) {
      const profileData = {};
      profileData.name = data.name;
      profileData.about = data.about;
      profileData.avatar = data.avatar;
      profileData.id = data._id;
      return profileData;
    }

    getUserInfo() {
        this._getProfileData
        .then((data) => {
          return this._setProfileData(data);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });

    }

    setUserInfo(name, about) {
      this._getProfileData(name, about)
      .then((data) => {
        console.log(`_setUserInfo: ${this._setProfileData(data)}`); //TODO: remove before release
        return this._setProfileData(data);
        //renderProfile(data); //TODO: Section/render method here
        //closePopup(popupProfile);
        //disableButton(profileFormButton, validationElements.inactiveButtonClass);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        changeSubmitButtonText(profileFormButton, 'Сохранить');
      });
    }

    editAvatar(picUrl) {
      this._editAvatar(picUrl)
      .then((data) => {
        console.log(`_setUserInfo: ${this._setProfileData(data)}`); //TODO: remove before release
        return this._setProfileData(data);
        // renderProfile(data);
        // closePopup(popupProfilePic);
        // disableButton(profilePictureFormButton, validationElements.inactiveButtonClass);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        changeSubmitButtonText(profilePictureFormButton, 'Сохранить');
      });
    }
}
