import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { handleError } from '../utils/error-handler';
import * as auth from '../utils/MainApi';

function useEditProfile(newProfile, isLoggedIn, setErrorMsg, handleLoader) {
  const history = useHistory();
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
          history.push('/movies');
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
  }, [newProfile]);

  return { newUsersProfile };
}

export default useEditProfile;
