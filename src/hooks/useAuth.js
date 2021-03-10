import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { handleError } from '../utils/ErrorHandler';
import * as mainApi from '../utils/MainApi';

function useAuth(credentials, setErrorMsg, setToken, isLogOut, setIsLogOut) {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { email, password, name } = credentials;

  useEffect(() => {
    const onSignIn = (email, password) => {
      mainApi
        .authorize(email, password)
        .then((data) => {
          if (data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
          }
        })
        .then((data) => {
          setIsLoggedIn(true);
          setIsLogOut(false);
          history.push('/movies');
        })
        .catch((err) => handleError(err.status, setErrorMsg));
    };

    const onSignUp = (email, password, name) => {
      mainApi
        .register(email, password, name)
        .then((res) => {
          if (res) {
            setErrorMsg('');
            onSignIn(email, password);
          }
        })
        .catch((err) => handleError(err.status, setErrorMsg));
    };

    if (email && name && password) {
      onSignUp(email, password, name);
    } else if (email && password) {
      onSignIn(email, password);
    }
  }, [credentials]);

  useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        setToken(jwt);
        mainApi
          .checkToken(jwt)
          .then((res) => {
            if (res) {
              !isLogOut && setIsLoggedIn(true);
            }
          })
          .catch((err) => handleError(err.status, setErrorMsg));
      }
    };
    handleTokenCheck();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLogOut) {
      localStorage.removeItem('jwt');
      history.push('/');
      setIsLoggedIn(false);
    }
  }, [isLogOut]);

  return { isLoggedIn };
}

export default useAuth;
