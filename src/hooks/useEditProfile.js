import { useState, useEffect } from 'react';
import { handleError } from '../utils/ErrorHandler';
import * as auth from '../utils/MainApi';

function useEditProfile(
  newProfile,
  isLoggedIn,
  setErrorMsg,
  setInfoMsg,
  handleLoader
) {
  const { email, name, token } = newProfile;
  const [newUsersProfile, setNewUsersProfile] = useState({});

  useEffect(() => {
    handleLoader(true);
    isLoggedIn &&
      auth
        .editProfile(email, name, token)
        .then((profile) => {
          handleLoader(false);
          setNewUsersProfile(profile.data);
          setInfoMsg('Данные были успешно изменены');
        })
        .catch((err) => handleError(err.status, setErrorMsg));
  }, [newProfile]);

  return { newUsersProfile };
}

export default useEditProfile;
