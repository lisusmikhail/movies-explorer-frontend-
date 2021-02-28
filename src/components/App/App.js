import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  shortMovieThresholdDuration,
  initialNumberItems,
  showMoreIncrement,
} from '../../utils/constants';
import { getMovies } from '../../utils/MoviesApi';
import useAuth from '../hooks/useAuth';
import useEditProfile from '../hooks/useEditProfile';
import useWindowSize from '../hooks/useWindowSize';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/MainApi';
import { handleError } from '../../utils/error-handler';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLogOut, setIsLogOut] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [credentials, setCredentials] = useState({});
  const [newProfile, setNewProfile] = useState({});

  const [allMovies, setAllMovies] = useState([]);
  const [myMovies, setMyMovies] = useState({});

  const [searchResult, setSearchResult] = useState([]);
  const [resultToLocalStorage, setResultToLocalStorage] = useState('');
  const [isStorageUpdated, setIsStorageUpdated] = useState(false);
  const [resultToShow, setResultToShow] = useState([]);

  const [resultToRender, setResultToRender] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(initialNumberItems);
  const [isShowMoreBtn, setIsShowMoreBtn] = useState(false);

  const [keyWord, setKeyWord] = useState('');
  const [isShortLength, setIsShortLength] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const size = useWindowSize();

  const { isLoggedIn } = useAuth(
    credentials,
    setErrorMsg,
    user,
    setToken,
    setIsTokenChecked,
    isLogOut,
    setIsLogOut
  );

  const { newUsersProfile } = useEditProfile(
    newProfile,
    isLoggedIn,
    setErrorMsg
  );

  const onAuth = (email, password, name) => {
    setCredentials({ email, password, name });
  };

  const onSignOut = () => {
    setIsLogOut(true);
    setUser({});
  };

  const onEditProfile = (email, _, name) => {
    setNewProfile({ email, name, token });
  };

  useEffect(() => {
    newUsersProfile.name && setUser(newUsersProfile);
  }, [newUsersProfile]);

  const settingInitialState = () => {
    setResultToRender([]);
    setResultToShow([]);
    setFirstIndex(0);
    setLastIndex(initialNumberItems);
    localStorage.setItem('movies', '');
    localStorage.setItem('keyWord', keyWord);
    localStorage.setItem('isShortLength', isShortLength.toString());
    setErrorMsg('');
  };

  useEffect(() => {
    isLoggedIn &&
      getMovies()
        .then((movies) => {
          setAllMovies(movies);
        })
        .catch(() => {
          handleError(500, setErrorMsg);
        });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const resultFromLocalStorage = localStorage.getItem('movies');
      setResultToShow(JSON.parse(resultFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setKeyWord(localStorage.getItem('keyWord'));
      if (localStorage.getItem('isShortLength') === 'false') {
        setIsShortLength(false);
      } else {
        setIsShortLength(true);
      }
    }
  }, [isFirstRender]);

  useEffect(() => {
    const searchMovies = (keyWord) => {
      const checkMovie = (movie) => {
        const nameRu = movie['nameRU'].toLowerCase().trim();
        const word = keyWord.toLowerCase().trim();
        const isShort = movie['duration'] < shortMovieThresholdDuration;
        return (!isShortLength || isShort) && nameRu.indexOf(word) > -1;
      };

      const moviesToShow = allMovies.filter(checkMovie);
      setSearchResult(moviesToShow);
    };

    resultToRender.length === 0 &&
      !isFirstRender &&
      allMovies &&
      keyWord &&
      searchMovies(keyWord);
  }, [allMovies, keyWord, isShortLength, resultToRender]);

  useMemo(() => {
    setResultToLocalStorage(JSON.stringify(searchResult));
  }, [searchResult]);

  useEffect(() => {
    !isFirstRender && localStorage.setItem('movies', resultToLocalStorage);
    !isFirstRender && setIsStorageUpdated(!isStorageUpdated);
  }, [resultToLocalStorage]);

  useEffect(() => {
    const resultFromLocalStorage = localStorage.getItem('movies');
    setResultToShow(JSON.parse(resultFromLocalStorage));
  }, [isStorageUpdated]);

  // console.log(resultToRender, resultToShow, firstIndex, lastIndex);

  useEffect(() => {
    resultToShow &&
      setResultToRender(
        resultToRender.concat(resultToShow.slice(firstIndex, lastIndex))
      );
  }, [resultToShow, lastIndex]);

  useEffect(() => {
    resultToShow && setIsShowMoreBtn(lastIndex < resultToShow.length);
  }, [resultToShow, lastIndex]);

  const onShowMore = () => {
    setFirstIndex(lastIndex);
    setLastIndex(lastIndex + showMoreIncrement);
  };

  const onSearchMovies = (searchQuery) => {
    settingInitialState();
    setKeyWord(searchQuery);
  };

  useEffect(() => {
    const getUserAndMyMovies = (token) => {
      auth
        .getUserAndMyMovies(token)
        .then(([user, myMovies]) => {
          setUser(user);
          setMyMovies(myMovies);
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    token && getUserAndMyMovies(token);
  }, [token]);

  const resetStates = () => {
    setErrorMsg('');
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className='app'>
        <Switch>
          <ProtectedRoute
            path='/profile'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            onAuth={onEditProfile}
            resetStates={resetStates}
            errorMsg={errorMsg}
            onSignOut={onSignOut}
            component={Profile}
          />
          <ProtectedRoute
            path='/movies'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            onSearch={onSearchMovies}
            isShortLength={isShortLength}
            setIsShortLength={setIsShortLength}
            setIsFirstRender={setIsFirstRender}
            resultToShow={resultToRender}
            onShowMore={onShowMore}
            isShowMoreBtn={isShowMoreBtn}
            component={Movies}
          />
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            component={SavedMovies}
          />
          <Route path='/signup'>
            <Register
              onAuth={onAuth}
              errorMsg={errorMsg}
              resetStates={resetStates}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path='/signin'>
            <Login
              onAuth={onAuth}
              errorMsg={errorMsg}
              resetStates={resetStates}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route exact path='/'>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
