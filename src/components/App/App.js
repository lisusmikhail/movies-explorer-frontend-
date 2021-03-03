import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { getMovies } from '../../utils/MoviesApi';
import useAuth from '../../hooks/useAuth';
import {
  shortMovieThresholdDuration,
  initialNumberItems,
  showMoreIncrement,
} from '../../utils/constants';
import useEditProfile from '../../hooks/useEditProfile';
import useWindowSize from '../../hooks/useWindowSize';
import useShowMore from '../../hooks/useShowMore';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
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
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');
  const [credentials, setCredentials] = useState({});
  const [newProfile, setNewProfile] = useState({});

  const [allMovies, setAllMovies] = useState([]);
  const [myMoviesToShow, setMyMoviesToShow] = useState([]);
  const [myMoviesToRender, setMyMoviesToRender] = useState([]);
  const [isShowMyMoreBtn, setIsShowMyMoreBtn] = useState(false);
  const [isMyMoviesUpdated, setIsMyMoviesUpdated] = useState(false);

  const [isResultUpdated, setIsResultUpdated] = useState(false);
  const [resultToLocalStorage, setResultToLocalStorage] = useState('');
  const [isStorageUpdated, setIsStorageUpdated] = useState(false);
  const [moviesToShow, setMoviesToShow] = useState([]);

  const [moviesToRender, setMoviesToRender] = useState([]);
  const [isShowMoreBtn, setIsShowMoreBtn] = useState(false);

  const [keyWord, setKeyWord] = useState('');
  const [isShortLength, setIsShortLength] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [movieToAdd, setMovieToAdd] = useState({});

  const size = useWindowSize();

  const { isLoggedIn } = useAuth(
    credentials,
    setErrorMsg,
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
    setCurrentUser({});
  };

  const onEditProfile = (email, _, name) => {
    setNewProfile({ email, name, token });
  };

  const handleIsFirstRender = (state) => {
    setIsFirstRender(state);
  };

  const handleIsShortLength = (state) => {
    console.log(state);
    setIsShortLength(state);
  };

  useEffect(() => {
    newUsersProfile.name && setCurrentUser(newUsersProfile);
  }, [newUsersProfile]);

  const settingInitialState = () => {
    console.log('settingInitialState');
    setMoviesToRender([]);
    setMoviesToShow([]);
    resetMoviesIndex();
    setErrorMsg('');
  };

  const settingInitialMyState = () => {
    setMyMoviesToShow([]);
    setMyMoviesToRender([]);
    resetMyMoviesIndex();
    setErrorMsg('');
  };

  // получение фильмов из базы данных
  useEffect(() => {
    isLoggedIn &&
      getMovies()
        .then((movies) => {
          setAllMovies(movies);
        })
        .catch(() => {
          handleError(500, setErrorMsg);
        });
  }, [isLoggedIn]);

  // получение фильмов для показа при загрузке страницы
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const resultFromLocalStorage = localStorage.getItem('movies');
      setMoviesToShow(JSON.parse(resultFromLocalStorage));
    }
  }, []);

  // назначение атрибутов из localStorage
  useEffect(() => {
    const shortLengthItem = localStorage.getItem('isShortLength');
    if (isFirstRender && shortLengthItem) {
      setKeyWord(localStorage.getItem('keyWord'));
      if (shortLengthItem === 'false') {
        setIsShortLength(false);
      } else {
        setIsShortLength(true);
      }
    }
  }, [isFirstRender]);

  //search start ---------------------------------------------------------

  console.log(isShortLength);
  useEffect(() => {
    console.log('search 0');
    const searchMovies = (keyWord) => {
      console.log('search 1');
      const checkMovie = (movie) => {
        const nameRu = movie['nameRU'].toLowerCase().trim();
        const word = keyWord.toLowerCase().trim();
        const isShort = movie['duration'] < shortMovieThresholdDuration;
        return (!isShortLength || isShort) && nameRu.indexOf(word) > -1;
      };
      const moviesToShow = allMovies.filter(checkMovie);
      console.log('search 2 moviesToShow', moviesToShow);
      setResultToLocalStorage(JSON.stringify(moviesToShow));
      setIsResultUpdated(!isResultUpdated);
    };

    moviesToRender.length === 0 &&
      !isFirstRender &&
      allMovies &&
      keyWord &&
      searchMovies(keyWord);
  }, [keyWord, isShortLength]);

  useEffect(() => {
    !isFirstRender && localStorage.setItem('movies', resultToLocalStorage);
    !isFirstRender && setIsStorageUpdated(!isStorageUpdated);
  }, [isResultUpdated]);

  useEffect(() => {
    const resultFromLocalStorage = localStorage.getItem('movies');
    setMoviesToShow(JSON.parse(resultFromLocalStorage));
  }, [isStorageUpdated]);

  useEffect(() => {
    localStorage.setItem('keyWord', keyWord);
    localStorage.setItem('isShortLength', isShortLength.toString());
  }, [keyWord, isShortLength]);

  const onSearchMovies = (searchQuery) => {
    console.log('search started because of enter');
    setKeyWord(searchQuery);
    keyWord !== searchQuery && settingInitialState();
  };

  const onCheckBoxSearch = (searchQuery) => {
    console.log('search started because of checkbox');
    setKeyWord(searchQuery);
    settingInitialState();
    // settingInitialMyState();
  };

  //search end ---------------------------------------------------------

  const resetStates = () => {
    setErrorMsg('');
  };

  // main api my movies start ----------------------------------

  useEffect(() => {
    const getUserAndMyMovies = (token) => {
      mainApi
        .getUserAndMyMovies(token)
        .then(([user, myMovies]) => {
          setCurrentUser(user);
          setMyMoviesToShow(myMovies);
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    token && getUserAndMyMovies(token);
  }, [token, isMyMoviesUpdated]);

  useEffect(() => {
    const addToFavorite = (movieToAdd) => {
      mainApi
        .addToFavorite(movieToAdd, token)
        .then((res) => {
          if (res) {
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
            // console.log(res);
            // console.log([...myMovies, res.data]);
            // setMyMovies([...myMovies, res.data]);
          } else {
            console.log('Произошла ошибка');
          }
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };

    isLoggedIn && addToFavorite(movieToAdd);
  }, [movieToAdd]);

  const onAddFavorite = (movieToAdd) => {
    setMovieToAdd(movieToAdd);
    settingInitialMyState();
  };

  // main api my movies end ----------------------------------

  // show more movies start ---------------------------------------
  const moviesShowMoreBtn = useShowMore({
    resultToShow: moviesToShow,
    resultToRender: moviesToRender,
    setResultToRender: setMoviesToRender,
    setIsShowMoreBtn: setIsShowMoreBtn,
  });

  const onMoviesShowMore = moviesShowMoreBtn.onShowMore;
  const resetMoviesIndex = moviesShowMoreBtn.resetIndex;

  const myMoviesShowMoreBtn = useShowMore({
    resultToShow: myMoviesToShow,
    resultToRender: myMoviesToRender,
    setResultToRender: setMyMoviesToRender,
    setIsShowMoreBtn: setIsShowMyMoreBtn,
  });

  const onMyMoviesShowMore = myMoviesShowMoreBtn.onShowMore;
  const resetMyMoviesIndex = myMoviesShowMoreBtn.resetIndex;

  // show more My movies end ---------------------------------------

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            onCheckBox={onCheckBoxSearch}
            isShortLength={isShortLength}
            handleIsShortLength={handleIsShortLength}
            setIsFirstRender={setIsFirstRender}
            moviesToRender={moviesToRender}
            onShowMore={onMoviesShowMore}
            isShowMoreBtn={isShowMoreBtn}
            onAddFavorite={onAddFavorite}
            handleIsFirstRender={handleIsFirstRender}
            component={Movies}
          />
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            myMoviesToRender={myMoviesToRender}
            isShowMoreBtn={isShowMyMoreBtn}
            onShowMore={onMyMoviesShowMore}
            handleIsFirstRender={handleIsFirstRender}
            handleIsShortLength={handleIsShortLength}
            onCheckBox={onCheckBoxSearch}
            isShortLength={isShortLength}
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
