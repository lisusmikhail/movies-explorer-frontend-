import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useGetMovies from '../../hooks/useGetMovies';
import useSearch from '../../hooks/useSearch';
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

  const [location, setLocation] = useState('');
  const [isLocationChanged, seIsLocationChanged] = useState(false);
  const [isLocationCorrect, setIsLocationCorrect] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [isLogOut, setIsLogOut] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');
  const [credentials, setCredentials] = useState({});
  const [newProfile, setNewProfile] = useState({});

  const [allMovies, setAllMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [myMoviesToShow, setMyMoviesToShow] = useState([]);
  const [myMoviesToRender, setMyMoviesToRender] = useState([]);
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
  const [isNewRender, setIsNewRender] = useState(false);

  const [movieToFavorite, setMovieToFavorite] = useState({});

  const [firstMyIndex, setFirstMyIndex] = useState(0);
  const [lastMyIndex, setLastMyIndex] = useState(initialNumberItems);
  const [isShowMoreMyBtn, setIsShowMoreMyBtn] = useState(false);

  const [checkLocation, setCheckLocation] = useState(false);
  const [isMovieReadyToRender, setIsMovieReadyToRender] = useState(false);
  const [isMyMovieReadyToRender, setIsMyMovieReadyToRender] = useState(false);

  console.log(
    'My Movies',
    isMyMovieReadyToRender,
    myMoviesToShow.length,
    myMoviesToRender.length
  );
  console.log(
    'All Movies',
    isMovieReadyToRender,
    moviesToShow.length,
    moviesToRender.length
  );

  // Authentication and Authorization

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
    localStorage.clear();
    setKeyWord('');
    setIsShortLength(false);
  };

  const onEditProfile = (email, _, name) => {
    setNewProfile({ email, name, token });
  };

  useEffect(() => {
    newUsersProfile.name && setCurrentUser(newUsersProfile);
  }, [newUsersProfile]);

  const resetStates = () => {
    setErrorMsg('');
  };

  // First render: get attributes from localStorage
  useEffect(() => {
    if (isFirstRender) {
      const shortLengthItem = localStorage.getItem('isShortLength');
      const keyWordItem = localStorage.getItem('keyWord');
      const moviesToShowItems = JSON.parse(localStorage.getItem('movies'));
      setMoviesToShow(moviesToShowItems);
      setKeyWord(keyWordItem);
      shortLengthItem === 'false' || !shortLengthItem
        ? setIsShortLength(false)
        : setIsShortLength(true);
    }

    // if (myMoviesToShow.length > 0) {
    //   setIsMyMovieReadyToRender(true);
    // }
  }, [isFirstRender, myMoviesToShow]);
  // Get initial set of movies
  const { gottenMovies } = useGetMovies(isLoggedIn);

  useMemo(() => {
    setAllMovies(gottenMovies);
  }, [gottenMovies]);

  // Initial States and Location
  // console.log('location==>', location, isLocationCorrect);

  const handleIsFirstRender = (state) => {
    setIsFirstRender(state);
  };

  const handleIsShortLength = (state) => {
    setIsShortLength(state);
  };

  const handleMovieMenuClick = (link) => {
    if (typeof link === 'string') {
      if (link.indexOf(location) === -1) {
        setIsLocationCorrect(false);
      }
    } else {
      setIsLocationCorrect(false);
    }
    setCheckLocation(!checkLocation);
  };

  useEffect(() => {
    // console.log('checkLocation ');
    setLocation(history.location.pathname);
    seIsLocationChanged(!isLocationChanged);
  }, [checkLocation]);

  useEffect(() => {
    (location === '/saved-movies' || location === '/movies') &&
      setIsLocationCorrect(true);
  }, [location]);

  useEffect(() => {
    // console.log('movie length is changed', isShortLength);
  }, [isShortLength]);

  // Render movies preparation
  useEffect(() => {
    // console.log('is location correct', location, isLocationCorrect);
    setIsMovieReadyToRender(false);
    setIsMyMovieReadyToRender(false);
    if (isLocationCorrect && location === '/saved-movies') {
      resetMyMoviesIndex();
      // debugger;
      setMyMoviesToRender([]);
      console.log('set111111111111');
      setIsMyMovieReadyToRender(true);
    } else if (isLocationCorrect && location === '/movies') {
      resetMoviesIndex();
      setMoviesToRender([]);
      setIsMovieReadyToRender(true);

      // resetMyMoviesIndex();
    }
  }, [isLocationCorrect]);

  // console.log(
  //   'MYMYMY',
  //   myMoviesToShow.length,
  //   myMoviesToRender.length,
  //   isMyMovieReadyToRender
  // );
  // console.log(
  //   'ALLALLALL',
  //   moviesToShow.length,
  //   moviesToRender.length,
  //   isMovieReadyToRender
  // );
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // show more movies start ---------------------------------------
  const handleResultMovies = (result) => {
    setMoviesToRender(result);
  };

  const handleBtnMovies = (state) => {
    console.log('handleBtnMovies', state);

    setIsShowMoreBtn(state);
  };

  const moviesShowMoreBtn = useShowMore({
    isReadyToRender: isMovieReadyToRender,
    resultToShow: moviesToShow,
    resultToRender: moviesToRender,
    handleResult: handleResultMovies,
    handleBtn: handleBtnMovies,
  });

  const onMoviesShowMore = moviesShowMoreBtn.onShowMore;
  const resetMoviesIndex = moviesShowMoreBtn.resetIndex;

  // show more my movies start ---------------------------------------
  const handleResultMyMovies = (result) => {
    // debugger;
    setMyMoviesToRender(result);
  };

  const handleBtnMyMovies = (state) => {
    console.log('handle Btn My Movies', state);

    setIsShowMoreMyBtn(state);
  };

  const myMoviesShowMoreBtn = useShowMore({
    isReadyToRender: isMyMovieReadyToRender,
    resultToShow: myMoviesToShow,
    resultToRender: myMoviesToRender,
    handleResult: handleResultMyMovies,
    handleBtn: handleBtnMyMovies,
    isNewRender,
  });

  const onMyMoviesShowMore = myMoviesShowMoreBtn.onShowMore;
  const resetMyMoviesIndex = myMoviesShowMoreBtn.resetIndex;

  //Movie search

  useEffect(() => {
    const searchMovies = (keyWord) => {
      const checkMovie = (movie) => {
        const nameRu = movie['nameRU'].toLowerCase().trim();
        const word = keyWord.toLowerCase().trim();
        const isShort = movie['duration'] < shortMovieThresholdDuration;
        return (!isShortLength || isShort) && nameRu.indexOf(word) > -1;
      };
      const moviesToShow = allMovies.filter(checkMovie);
      setMoviesToShow(moviesToShow);
      localStorage.setItem('movies', JSON.stringify(moviesToShow));
      localStorage.setItem('keyWord', keyWord);
      localStorage.setItem('isShortLength', isShortLength.toString());
      setIsMovieReadyToRender(true);
    };

    moviesToRender.length === 0 &&
      !isFirstRender &&
      allMovies &&
      keyWord &&
      searchMovies(keyWord);
  }, [keyWord, isShortLength]);

  const onSearchMovies = (searchQuery) => {
    if (searchQuery !== keyWord) {
      resetMoviesSet();
      resetMoviesIndex();
    }
    setKeyWord(searchQuery);
  };

  const onCheckBoxMovie = (searchQuery = '') => {
    resetMoviesSet();
    resetMoviesIndex();
    setKeyWord(searchQuery);

    resetMyMoviesIndex();
    resetMyMoviesSet();
  };

  const resetMoviesSet = () => {
    setMoviesToShow([]);
    setMoviesToRender([]);
    setIsMovieReadyToRender(false);
  };

  // main api my movies  ----------------------------------

  // console.log(myMovies, myMoviesToShow);

  useEffect(() => {
    const getUserAndMyMovies = (token) => {
      mainApi
        .getUserAndMyMovies(token)
        .then(([user, myMovies]) => {
          setCurrentUser(user);
          setMyMovies(myMovies);
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    token && getUserAndMyMovies(token);
  }, [token, isMyMoviesUpdated]);

  useEffect(() => {
    const checkMovie = (movie) => {
      const isShort = movie['duration'] < shortMovieThresholdDuration;
      return !isShortLength || isShort;
    };
    const moviesToShow = myMovies.filter(checkMovie);
    setMyMoviesToShow(moviesToShow);
    console.log('set2222222222222');
    setIsMyMovieReadyToRender(true);
  }, [myMovies, isShortLength]);

  useEffect(() => {
    if (
      isLocationCorrect &&
      location === '/saved-movies' &&
      myMoviesToShow.length > 0 &&
      isMyMovieReadyToRender &&
      isFirstRender
    ) {
      console.log('setsetsetsetsetsetsetsetsetsetsetsetsetsetset');
      setIsNewRender(!isNewRender);
    }
  }, [isMyMovieReadyToRender, myMoviesToShow]);

  useEffect(() => {
    const addToFavorite = (movieToAdd) => {
      mainApi
        .addToFavorite(movieToAdd, token)
        .then((res) => {
          if (res) {
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          } else {
            console.log('Произошла ошибка');
          }
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    isLoggedIn && addToFavorite(movieToFavorite);
  }, [movieToFavorite]);

  const onFavorite = (movie) => {
    setMovieToFavorite(movie);
  };

  const onCheckBoxMyMovie = (searchQuery = '') => {
    console.log('onCheckBoxMyMovie');
    resetMyMoviesSet();
    resetMyMoviesIndex();
    // setKeyWord(searchQuery);
    resetMoviesSet();
    resetMoviesIndex();
  };

  const resetMyMoviesSet = () => {
    setMyMoviesToShow([]);
    // debugger;
    setMyMoviesToRender([]);
    setIsMyMovieReadyToRender(false);
  };

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
            handleMovieMenuClick={handleMovieMenuClick}
            component={Profile}
          />
          <ProtectedRoute
            path='/movies'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            onSearch={onSearchMovies}
            onCheckBox={onCheckBoxMovie}
            isShortLength={isShortLength}
            handleIsShortLength={handleIsShortLength}
            setIsFirstRender={setIsFirstRender}
            moviesToRender={moviesToRender}
            onShowMore={onMoviesShowMore}
            isShowMoreBtn={isShowMoreBtn}
            onFavorite={onFavorite}
            handleMovieMenuClick={handleMovieMenuClick}
            handleIsFirstRender={handleIsFirstRender}
            myMovies={myMovies}
            location={location}
            component={Movies}
          />
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            myMoviesToRender={myMoviesToRender}
            isShowMoreBtn={isShowMoreMyBtn}
            onShowMore={onMyMoviesShowMore}
            handleIsFirstRender={handleIsFirstRender}
            handleIsShortLength={handleIsShortLength}
            onCheckBox={onCheckBoxMyMovie}
            isShortLength={isShortLength}
            handleMovieMenuClick={handleMovieMenuClick}
            myMovies={myMovies}
            location={location}
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
            <Header
              isLoggedIn={isLoggedIn}
              handleMovieMenuClick={handleMovieMenuClick}
            />
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

// const settingInitialState = () => {
//   // console.log('settingInitialState');
//   setMoviesToRender([]);
//   setMoviesToShow([]);
//   resetMoviesIndex();
//   setErrorMsg('');
// };
//
// const settingMyInitialState = () => {
//   // console.log('settingMyInitialState');
//   setMyMoviesToRender([]);
//   setMyMoviesToShow([]);
//   resetMyMoviesIndex();
//   setErrorMsg('');
// };
//
// получение фильмов для показа при загрузке страницы
// useEffect(() => {
//   if (localStorage.getItem('movies')) {
//     const resultFromLocalStorage = localStorage.getItem('movies');
//     setMoviesToShow(JSON.parse(resultFromLocalStorage));
//   }
// }, []);
// useEffect(() => {
//   if (location !== '/saved-movies') {
//     setMyMoviesToRender([]);
//     setFirstMyIndex(0);
//     setLastMyIndex(initialNumberItems);
//     setIsNewRender(!isNewRender);
//   } else if (location !== '/movies') {
//     setMoviesToRender([]);
//   }
// }, [isShortLength, isLocationChanged]);

// useEffect(() => {
//   !isFirstRender && localStorage.setItem('movies', resultToLocalStorage);
//   !isFirstRender && setIsStorageUpdated(!isStorageUpdated);
// }, [isResultUpdated]);

// useEffect(() => {
//   const resultFromLocalStorage = localStorage.getItem('movies');
//   setMoviesToShow(JSON.parse(resultFromLocalStorage));
// }, [isStorageUpdated]);

// useEffect(() => {
//   localStorage.setItem('keyWord', keyWord);
//   localStorage.setItem('isShortLength', isShortLength.toString());
// }, [keyWord, isShortLength]);

// const onCheckBoxMyMovie = () => {
//   setMyMoviesToRender([]);
// };
//

// const onSearchMovies = (searchQuery) => {
//   resetMoviesSet();
//   resetMoviesIndex();
//   setKeyWord(searchQuery);
// }

// showMoreBtn my movies

//
// const handleResultMyMovies = (result) => {
//   setMyMoviesToRender(result);
// };
//
// const handleBtnMyMovies = (state) => {
//   setIsShowMoreMyBtn(state);
// };
//
// useEffect(() => {
//   myMoviesToShow &&
//     handleResultMyMovies(
//       myMoviesToRender.concat(myMoviesToShow.slice(firstMyIndex, lastMyIndex))
//     );
// }, [myMoviesToShow, lastMyIndex, isNewRender]);
//
// useEffect(() => {
//   myMoviesToShow && handleBtnMyMovies(lastMyIndex < myMoviesToShow.length);
// }, [myMoviesToShow, lastMyIndex]);
//
// const onMyMoviesShowMore = () => {
//   setFirstMyIndex(lastMyIndex);
//   setLastMyIndex(lastMyIndex + showMoreIncrement);
// };
//
// const resetMyMoviesIndex = () => {
//   setFirstMyIndex(0);
//   setLastMyIndex(initialNumberItems);
// };
