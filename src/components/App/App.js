import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useAuth from '../../hooks/useAuth';
import useGetInitialData from '../../hooks/useGetInitialData';
import {
  INITIAL_NUMBER_OF_ITEMS,
  SHORT_MOVIE_THRESHOLD_DURATION,
  SHOW_MORE_INCREMENT,
} from '../../utils/constants';
import useEditProfile from '../../hooks/useEditProfile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import { handleError } from '../../utils/ErrorHandler';
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
  const [location, setLocation] = useState('');
  //errors
  const [errorMsg, setErrorMsg] = useState('');
  const [searchResultInfo, setSearchResultInfo] = useState('');
  const [searchResultError, setSearchResultError] = useState('');
  //auth
  const [isLogOut, setIsLogOut] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');
  const [credentials, setCredentials] = useState({});
  const [newProfile, setNewProfile] = useState({});
  // search criteria
  const [keyWord, setKeyWord] = useState('');
  const [isShortLength, setIsShortLength] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  //my movies
  const [myMovies, setMyMovies] = useState([]);
  const [myMoviesSearchResult, setMyMoviesSearchResult] = useState([]);
  const [myMoviesFilteredResult, setMyMoviesFilteredResult] = useState([]);
  const [isMyMoviesUpdated, setIsMyMoviesUpdated] = useState(false);
  //my search
  const [myKeyWord, setMyKeyWord] = useState('');
  //all movies
  const [allMovies, setAllMovies] = useState([]);
  const [moviesSearchResult, setMoviesSearchResult] = useState([]);
  const [moviesFilteredResult, setMoviesFilteredResult] = useState([]);
  // movies rendering
  const [newSearch, setNewSearch] = useState(false);
  const [newRender, setNewRender] = useState(false);
  const [isMovieMenuClicked, setIsMovieMenuClicked] = useState(false);
  const [isAllDataReady, setIsAllDataReady] = useState(false);
  //on show more button
  const [isShowMoreBtn, setIsShowMoreBtn] = useState(false);
  const [lastIndex, setLastIndex] = useState(INITIAL_NUMBER_OF_ITEMS);
  const [lastMyIndex, setLastMyIndex] = useState(0);
  const [isClearBtn, setIsClearBtn] = useState(false);
  // favorite
  const [movieToFavorite, setMovieToFavorite] = useState({});
  const [movieToDelFromFavorite, setMovieToDelFromFavorite] = useState({});
  //loader
  const [isLoader, setIsLoader] = useState(false);

  //handle location
  const history = useHistory();

  const handleMovieMenuClick = () => {
    setIsMovieMenuClicked(!isMovieMenuClicked);
  };

  useEffect(() => {
    if (
      isFirstRender &&
      location === '/saved-movies' &&
      myMoviesFilteredResult.length === 0
    ) {
      setIsLoader(true);
      setIsMyMoviesUpdated(!isMyMoviesUpdated);
    }
  }, [location]);

  useEffect(() => {
    setSearchResultInfo('');
    setSearchResultError('');
  }, [location]);

  useEffect(() => {
    setLocation(history.location.pathname);
  }, [isMovieMenuClicked]);

  // Authentication and Authorization
  const { isLoggedIn } = useAuth(
    credentials,
    setErrorMsg,
    setToken,
    isLogOut,
    setIsLogOut
  );

  const handleLoader = (state) => {
    setIsLoader(state);
  };

  const { newUsersProfile } = useEditProfile(
    newProfile,
    isLoggedIn,
    setErrorMsg,
    handleLoader
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

  // Get initial data of all movies , my movies, and  current user
  const {
    initialUser,
    initialMyMovies,
    readyToUseAllMovies,
  } = useGetInitialData(
    token,
    isMyMoviesUpdated,
    setErrorMsg,
    setSearchResultError,
    setIsLoader
  );

  useEffect(() => {
    setCurrentUser(initialUser);
    setMyMovies(initialMyMovies);
    setMyMoviesSearchResult(initialMyMovies);
    setAllMovies(readyToUseAllMovies);
    setIsAllDataReady(!isAllDataReady);
  }, [initialUser, initialMyMovies, readyToUseAllMovies]);

  // First render: get values and attributes from localStorage
  useEffect(() => {
    if (isFirstRender) {
      const shortLengthItem = localStorage.getItem('isShortLength');
      const keyWordItem = localStorage.getItem('keyWord');
      const moviesToShowItems = JSON.parse(localStorage.getItem('movies'));
      moviesToShowItems === null
        ? setMoviesSearchResult([])
        : setMoviesSearchResult(moviesToShowItems);
      keyWordItem === null ? setKeyWord('') : setKeyWord(keyWordItem);
      keyWordItem !== null &&
        keyWordItem.length > 0 &&
        moviesToShowItems.length === 0 &&
        setKeyWord('');
      shortLengthItem === 'false' || !shortLengthItem
        ? setIsShortLength(false)
        : setIsShortLength(true);
    }
  }, [isFirstRender]);

  // movies rendering and show more button state
  const onMoviesShowMore = () => {
    setLastIndex(lastIndex + SHOW_MORE_INCREMENT);
  };

  const resetMoviesIndex = () => {
    setLastIndex(INITIAL_NUMBER_OF_ITEMS);
  };

  const handleBtnMovies = (state) => {
    setIsShowMoreBtn(state);
  };

  useEffect(() => {
    moviesFilteredResult &&
      handleBtnMovies(lastIndex < moviesFilteredResult.length);
  }, [lastIndex, moviesFilteredResult, newRender]);

  //reset functions
  const resetMyMoviesResults = () => {
    setMyMoviesSearchResult([]);
    setMyMoviesFilteredResult([]);
  };

  const resetMoviesResults = () => {
    setMoviesSearchResult([]);
    setMoviesFilteredResult([]);
  };

  // handle checkbox state
  const handleIsShortLength = (state) => {
    localStorage.setItem('isShortLength', state);
    setIsShortLength(state);
    setMoviesFilteredResult([]);
  };

  //movies and my movies search
  const getNewSearchResult = (moviesSet, newKeyWord) => {
    const checkMovie = (movie) => {
      const nameRu = movie['nameRU'].toLowerCase().trim();
      const word = newKeyWord.toLowerCase().trim();
      return nameRu.indexOf(word) > -1;
    };
    return moviesSet.filter(checkMovie);
  };

  const handleNoContentMsg = (currentMovieSet, currentKeyWord) => {
    const currentMessage = isShortLength
      ? 'По вашему запросу ничего не найдено. Попробуйте поискать без фильтра "короткометражки".'
      : 'По вашему запросу ничего не найдено.';
    !isFirstRender &&
      currentMovieSet.length === 0 &&
      currentKeyWord &&
      setSearchResultInfo(currentMessage);
    currentMovieSet.length !== 0 && setSearchResultInfo('');
  };

  const handleQueryException = (currentQuery) => {
    if (currentQuery.length === 0) {
      setSearchResultInfo('Введите ключевое слово, пожалуйста.');
    } else if (currentQuery.length > 35) {
      setSearchResultInfo(
        'Самое длинное словарное слово в русском языке состоит из 35 букв.'
      );
      setIsClearBtn(true);
    }
  };

  useEffect(() => {
    const searchMovies = (keyWord) => {
      const moviesToShow = getNewSearchResult(allMovies, keyWord);
      setMoviesSearchResult(moviesToShow);
      setMoviesFilteredResult([]);
      localStorage.setItem('movies', JSON.stringify(moviesToShow));
      localStorage.setItem('keyWord', keyWord);
      setNewRender(!newRender);
      setIsLoader(false);
    };

    !isFirstRender && allMovies && keyWord && searchMovies(keyWord);
  }, [keyWord, newSearch, isAllDataReady]);

  useEffect(() => {
    const searchMyMovies = (myKeyWord) => {
      const moviesToShow = getNewSearchResult(myMovies, myKeyWord);
      setMyMoviesSearchResult(moviesToShow);
      setIsLoader(false);
    };
    myMovies && myKeyWord && searchMyMovies(myKeyWord);
  }, [myKeyWord, isMovieMenuClicked, isAllDataReady, myMovies]);

  const onSearchMovies = (searchQuery) => {
    setSearchResultInfo('');
    setSearchResultError('');
    if (
      (searchQuery.length === 0 && keyWord.length === 0) ||
      searchQuery.length > 35
    ) {
      handleQueryException(searchQuery);
    } else if (keyWord !== searchQuery && !!searchQuery) {
      setIsFirstRender(false);
      setIsClearBtn(true);
      resetMoviesIndex();
      resetMoviesResults();
      setNewSearch(!newSearch);
      setKeyWord(searchQuery);
    }
  };

  const onSearchMyMovies = (searchQuery) => {
    setSearchResultInfo('');
    setSearchResultError('');
    if (
      (searchQuery.length === 0 && myKeyWord.length === 0) ||
      searchQuery.length > 35
    ) {
      handleQueryException(searchQuery);
    } else if (myKeyWord !== searchQuery && !!searchQuery) {
      setIsFirstRender(false);
      setIsClearBtn(true);
      setMyKeyWord(searchQuery);
    }
  };

  //movies filter
  const getMoviesToShow = (moviesResult) => {
    const checkMovie = (movie) => {
      const isShort = movie['duration'] < SHORT_MOVIE_THRESHOLD_DURATION;
      return !isShortLength || isShort;
    };
    return moviesResult.filter(checkMovie);
  };

  useEffect(() => {
    if (moviesSearchResult && moviesFilteredResult.length === 0) {
      const moviesToShow = getMoviesToShow(moviesSearchResult);
      setMoviesFilteredResult(moviesToShow);
      setNewRender(!newRender);
    }
  }, [moviesSearchResult, isShortLength]);

  useEffect(() => {
    if (myMoviesSearchResult) {
      const moviesToShow = getMoviesToShow(myMoviesSearchResult);
      setLastMyIndex(moviesToShow.length - 1);
      setMyMoviesFilteredResult(moviesToShow);
      setIsLoader(false);
    }
  }, [myMoviesSearchResult, isShortLength]);

  useEffect(() => {
    !isClearBtn &&
      myMoviesSearchResult &&
      setMyMoviesFilteredResult(myMoviesSearchResult);
  }, [isClearBtn]);

  useEffect(() => {
    location === '/movies' && handleNoContentMsg(moviesFilteredResult, keyWord);
  }, [moviesFilteredResult, newSearch, isShortLength]);

  useEffect(() => {
    location === '/saved-movies' &&
      handleNoContentMsg(myMoviesFilteredResult, myKeyWord);
  }, [myMoviesFilteredResult]);

  //clear search button
  const onClearSearchMovies = () => {
    setKeyWord('');
    setSearchResultInfo('');
    setSearchResultError('');
    setIsClearBtn(false);
    resetMoviesResults();
    localStorage.setItem('keyWord', '');
    localStorage.removeItem('movies');
    localStorage.removeItem('isShortLength');
  };

  const onClearSearchMyMovies = () => {
    setMyKeyWord('');
    setSearchResultInfo('');
    setSearchResultError('');
    setIsClearBtn(false);
    resetMyMoviesResults();
    setMyMoviesSearchResult(myMovies);
  };

  useEffect(() => {
    if (location === '/saved-movies') {
      myKeyWord !== '' ? setIsClearBtn(true) : setIsClearBtn(false);
    } else if (location === '/movies') {
      keyWord !== '' ? setIsClearBtn(true) : setIsClearBtn(false);
    }
  }, [keyWord, myKeyWord, location]);

  // add favorite
  useEffect(() => {
    const addToFavorite = (movieToAdd) => {
      mainApi
        .addToFavorite(movieToAdd, token)
        .then((res) => {
          if (res) {
            setSearchResultError('');
            let indexOfAdd;
            moviesSearchResult.find((movie) => {
              indexOfAdd = moviesSearchResult.indexOf(movie);
              return movie.movieId === res.data.movieId;
            });

            moviesSearchResult[indexOfAdd]._id = res.data._id;
            localStorage.setItem('movies', JSON.stringify(moviesSearchResult));
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          }
          setMovieToFavorite({});
        })
        .catch((err) => handleError(err.status, setSearchResultError));
    };

    isLoggedIn && movieToFavorite.movieId && addToFavorite(movieToFavorite);
  }, [movieToFavorite]);

  // del favorite
  useEffect(() => {
    const delFromFavorite = (movieToDel) => {
      setIsLoader(true);
      setIsFirstRender(false);
      const handleDelMovie = (moviesSet, res) => {
        let indexOfDelMovie;
        moviesSet.find((movie, index) => {
          indexOfDelMovie = index;
          return movie.movieId === res.movieId;
        });
        delete moviesSet[indexOfDelMovie]['_id'];
        moviesSet === moviesSearchResult &&
          localStorage.setItem('movies', JSON.stringify(moviesSet));
      };

      const handleDelMyMovie = (moviesSet, res) => {
        let indexOfDelMovie;
        moviesSet.find((movie, index) => {
          indexOfDelMovie = index;
          return movie._id === res._id;
        });
        moviesSet.splice(indexOfDelMovie, 1);
        setIsMyMoviesUpdated(!isMyMoviesUpdated);
      };

      mainApi
        .delFromFavorite(movieToDel, token)
        .then((res) => {
          if (res) {
            setSearchResultError('');
            handleDelMyMovie(myMovies, res);
            handleDelMovie(allMovies, res);
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          }
          setMovieToDelFromFavorite({});
        })
        .catch((err) => {
          handleError(err.status, setSearchResultError);
        });
    };

    isLoggedIn &&
      movieToDelFromFavorite._id &&
      delFromFavorite(movieToDelFromFavorite);
  }, [movieToDelFromFavorite]);

  const onFavorite = (movie) => {
    if (!movie._id) {
      setMovieToFavorite(movie);
    } else {
      setMovieToDelFromFavorite(movie);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Switch>
          <ProtectedRoute
            path='/profile'
            isLoggedIn={isLoggedIn}
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
            onSearch={onSearchMovies}
            isShortLength={isShortLength}
            handleIsShortLength={handleIsShortLength}
            onShowMore={onMoviesShowMore}
            isShowMoreBtn={isShowMoreBtn}
            onFavorite={onFavorite}
            handleMovieMenuClick={handleMovieMenuClick}
            onClearSearch={onClearSearchMovies}
            keyWord={keyWord}
            isLoader={isLoader}
            searchResultInfo={searchResultInfo}
            searchResultError={searchResultError}
            moviesFilteredResult={moviesFilteredResult}
            lastIndex={lastIndex}
            isClearBtn={isClearBtn}
            component={Movies}
          />
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            onSearch={onSearchMyMovies}
            moviesFilteredResult={myMoviesFilteredResult}
            lastIndex={lastMyIndex}
            handleIsShortLength={handleIsShortLength}
            isShortLength={isShortLength}
            handleMovieMenuClick={handleMovieMenuClick}
            onClearSearch={onClearSearchMyMovies}
            onFavorite={onFavorite}
            keyWord={myKeyWord}
            isLoader={isLoader}
            searchResultInfo={searchResultInfo}
            searchResultError={searchResultError}
            isClearBtn={isClearBtn}
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
