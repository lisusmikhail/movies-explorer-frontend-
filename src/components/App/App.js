import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useGetMovies from '../../hooks/useGetMovies';
import useAuth from '../../hooks/useAuth';
import useGetInitialData from '../../hooks/useGetInitialData';
import { shortMovieThresholdDuration } from '../../utils/constants';
import useEditProfile from '../../hooks/useEditProfile';
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
  const [errorMsg, setErrorMsg] = useState('');
  //user
  const [isLogOut, setIsLogOut] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
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
  const [myMoviesToRender, setMyMoviesToRender] = useState([]);
  const [isMyMoviesUpdated, setIsMyMoviesUpdated] = useState(false);
  //my search
  const [myKeyWord, setMyKeyWord] = useState('');
  //all movies
  const [allMovies, setAllMovies] = useState([]);
  const [moviesSearchResult, setMoviesSearchResult] = useState([]);
  const [moviesFilteredResult, setMoviesFilteredResult] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);
  // movies rendering
  const [newSearch, setNewSearch] = useState(false);
  const [newRender, setNewRender] = useState(false);
  const [isShowMoreBtn, setIsShowMoreBtn] = useState(false);
  const [isMoviesReadyToRender, setIsMoviesReadyToRender] = useState(false);
  const [isMovieMenuClicked, setIsMovieMenuClicked] = useState(false);
  const [isAllDataReady, setIsAllDataReady] = useState(false);
  // favorite
  const [movieToFavorite, setMovieToFavorite] = useState({});
  const [movieToDelFromFavorite, setMovieToDelFromFavorite] = useState({});

  // console.log('++++++++++++++++++++++++++++++++++', myKeyWord);
  // console.log({ isFirstRender });
  // console.log('=================================', myMovies);
  // console.log({ isMovieReadyToRender });
  // console.log(
  //   'moviesSearchResult',
  //   moviesSearchResult,
  //   moviesSearchResult && moviesSearchResult.length
  // );

  // console.log(
  //   'moviesToRender',
  //   moviesToRender,
  //   moviesToRender && moviesToRender.length
  // );
  // console.log('filter', moviesFilteredResult && moviesFilteredResult.length);
  // console.log('filter', moviesFilteredResult);
  // console.log(currentUser);
  // console.log(
  //   'myMoviesSearchResult',
  //   myMoviesSearchResult,
  //   myMoviesSearchResult && myMoviesSearchResult.length
  // );
  // console.log('render', myMoviesToRender && myMoviesToRender.length);
  // console.log('render', myMoviesToRender);
  // console.log(myMovies, myMoviesSearchResult, isAllDataReady);
  // console.log('isFirstRender', isFirstRender);
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

  // Get initial set of movies , my movies, and  current user
  const {
    initialUser,
    initialMyMovies,
    readyToUseAllMovies,
  } = useGetInitialData(token, isMyMoviesUpdated);

  // console.log('initialUser, initialMyMovies, ', readyToUseAllMovies);

  useMemo(() => {
    setCurrentUser(initialUser);
    setMyMovies(initialMyMovies);
    setMyMoviesSearchResult(initialMyMovies);
    // setMyMoviesToRender([]); //???????????????????
    setAllMovies(readyToUseAllMovies);
    setIsAllDataReady(!isAllDataReady);
  }, [initialUser, initialMyMovies, readyToUseAllMovies]);

  // First render: get values and attributes from localStorage
  useEffect(() => {
    if (isFirstRender) {
      const shortLengthItem = localStorage.getItem('isShortLength');
      const keyWordItem = localStorage.getItem('keyWord');
      const moviesToShowItems = JSON.parse(localStorage.getItem('movies'));
      setMoviesSearchResult(moviesToShowItems);
      setKeyWord(keyWordItem);
      shortLengthItem === 'false' || !shortLengthItem
        ? setIsShortLength(false)
        : setIsShortLength(true);
      setIsMoviesReadyToRender(true);
      const myKeyWordItem = localStorage.getItem('myKeyWord');
      setMyKeyWord(myKeyWordItem);
    }
  }, [isFirstRender]);

  const handleMovieMenuClick = () => {
    setIsMovieMenuClicked(!isMovieMenuClicked);
  };

  // movies rendering and show more button state
  const handleResultMovies = (result) => {
    setMoviesToRender(result);
  };

  const handleBtnMovies = (state) => {
    setIsShowMoreBtn(state);
  };

  const moviesShowMoreBtn = useShowMore({
    isReadyToRender: isMoviesReadyToRender,
    resultToShow: moviesFilteredResult,
    resultToRender: moviesToRender,
    handleResult: handleResultMovies,
    handleBtn: handleBtnMovies,
    newRender: newRender,
  });

  const onMoviesShowMore = moviesShowMoreBtn.onShowMore;
  const resetMoviesIndex = moviesShowMoreBtn.resetIndex;

  //movies search
  const getNewSearchResult = (moviesSet, newKeyWord) => {
    console.log(moviesSet, newKeyWord);
    const checkMovie = (movie) => {
      const nameRu = movie['nameRU'].toLowerCase().trim();
      const word = newKeyWord.toLowerCase().trim();
      return nameRu.indexOf(word) > -1;
    };
    return moviesSet.filter(checkMovie);
  };

  useEffect(() => {
    const searchMovies = (keyWord) => {
      console.log('new search');
      const moviesToShow = getNewSearchResult(allMovies, keyWord);
      setMoviesSearchResult(moviesToShow);
      setMoviesFilteredResult([]);
      localStorage.setItem('movies', JSON.stringify(moviesToShow));
      localStorage.setItem('keyWord', keyWord);
      setIsMoviesReadyToRender(true);
      setNewRender(!newRender);
    };

    moviesToRender.length === 0 &&
      !isFirstRender &&
      allMovies &&
      keyWord &&
      searchMovies(keyWord);
  }, [keyWord, newSearch]);

  //movies filter
  const getMoviesToShow = (moviesResult) => {
    const checkMovie = (movie) => {
      const isShort = movie['duration'] < shortMovieThresholdDuration;
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

  //search and filter triggers
  const resetMoviesResults = () => {
    setMoviesSearchResult([]);
    setMoviesFilteredResult([]);
    setMoviesToRender([]);
  };

  const onSearchMovies = (searchQuery) => {
    setIsFirstRender(false);
    if (searchQuery !== keyWord) {
      resetMoviesResults();
      setIsMoviesReadyToRender(false);
      resetMoviesIndex();
    } else {
      resetMoviesIndex();
      resetMoviesResults();
      setNewSearch(!newSearch);
    }
    setKeyWord(searchQuery);
  };

  const handleIsShortLength = (state) => {
    localStorage.setItem('isShortLength', state);
    setIsShortLength(state);
    setMoviesFilteredResult([]);
    setMoviesToRender([]);
    // setMyMoviesToRender([]); // ??????
    resetMoviesIndex();
  };

  // my movies search and filter triggers
  useEffect(() => {
    if (myMoviesSearchResult) {
      const moviesToShow = getMoviesToShow(myMoviesSearchResult);
      // console.log('move search 222222', moviesToShow);
      setMyMoviesToRender(moviesToShow);
    }
  }, [myMoviesSearchResult, isShortLength]);

  useEffect(() => {
    const searchMyMovies = (myKeyWord) => {
      console.log('new my search', myKeyWord);
      const moviesToShow = getNewSearchResult(myMovies, myKeyWord);
      console.log(moviesToShow);
      setMyMoviesSearchResult(moviesToShow);
    };
    // myMoviesToRender.length === 0 &&
    myMovies && myKeyWord && searchMyMovies(myKeyWord);
  }, [myKeyWord, isMovieMenuClicked, isAllDataReady, myMovies]);

  const resetMyMoviesResults = () => {
    setMyMoviesSearchResult([]);
    setMyMoviesToRender([]);
  };

  const onSearchMyMovies = (searchQuery) => {
    setIsFirstRender(false);
    resetMyMoviesResults();
    localStorage.setItem('myKeyWord', searchQuery);
    setMyKeyWord(searchQuery);
  };

  const onClearSearchMovies = () => {
    setKeyWord('');
    resetMoviesResults();
    localStorage.removeItem('keyWord');
    localStorage.removeItem('movies');
    localStorage.removeItem('isShortLength');
  };

  const onClearSearchMyMovies = () => {
    setMyKeyWord('');
    localStorage.removeItem('myKeyWord');
    setMyMoviesSearchResult(myMovies);
  };

  useEffect(() => {
    const addToFavorite = (movieToAdd) => {
      console.log('onFavorite in App 2', token, movieToAdd);
      mainApi
        .addToFavorite(movieToAdd, token)
        .then((res) => {
          if (res) {
            if (res.data._id) {
              let indexOfUpdatedMovieInSearchResult;
              const updatedMovieInSearchResult = moviesSearchResult.find(
                (movie) => {
                  indexOfUpdatedMovieInSearchResult = moviesSearchResult.indexOf(
                    movie
                  );
                  return movie.movieId === res.data.movieId;
                }
              );

              moviesSearchResult[
                indexOfUpdatedMovieInSearchResult
              ].isFavorite = true;
              moviesSearchResult.splice(
                indexOfUpdatedMovieInSearchResult,
                1,
                updatedMovieInSearchResult
              );
              localStorage.setItem(
                'movies',
                JSON.stringify(moviesSearchResult)
              );
            }
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          } else {
            console.log('Произошла ошибка');
          }
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    isLoggedIn && addToFavorite(movieToFavorite);
  }, [movieToFavorite]);

  useEffect(() => {
    const delFromFavorite = (movieToDel) => {
      console.log('onFavorite in App 2 DEL', token, movieToDel);
      mainApi
        .delFromFavorite(movieToDel, token)
        .then((res) => {
          if (res) {
            console.log('onDEl', res, res._id);
            let indexOfDelFavoriteInMyMovies;
            myMoviesToRender.find((movie, index) => {
              indexOfDelFavoriteInMyMovies = index;
              return movie._id === res._id;
            });
            myMoviesToRender.splice(indexOfDelFavoriteInMyMovies, 1);

            let indexOfDelFavoriteInRenderedMovies;
            moviesToRender.find((movie, index) => {
              indexOfDelFavoriteInRenderedMovies = index;
              return movie.movieId === res.movieId;
            });
            moviesToRender[
              indexOfDelFavoriteInRenderedMovies
            ].isFavorite = false;

            let indexOfDelFavoriteInSearchResult;
            allMovies.find((movie, index) => {
              indexOfDelFavoriteInSearchResult = index;
              return movie.movieId === res.movieId;
            });
            allMovies[indexOfDelFavoriteInSearchResult].isFavorite = false;

            console.log(
              moviesToRender,
              moviesToRender[indexOfDelFavoriteInRenderedMovies],
              indexOfDelFavoriteInRenderedMovies
            );

            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          }
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    isLoggedIn && delFromFavorite(movieToDelFromFavorite);
  }, [movieToDelFromFavorite]);

  // useEffect(() => {
  //   const delFavoriteIcon = () => {
  //     let indexOfDelFavoriteInMovies;
  //     moviesSearchResult.find((movie, index) => {
  //       indexOfDelFavoriteInMovies = index;
  //       return movie._id === res._id;
  //     });
  //     const currentMovie = moviesSearchResult[indexOfDelFavoriteInMovies];
  //     console.log(currentMovie);
  //   }
  //   delFavoriteIcon(movieToDelFromFavorite)
  // }, [movieToDelFromFavorite])

  const onFavorite = (movie, toDelete) => {
    delete movie['isFavorite'];
    // console.log('onFavorite in App', movie, toDelete);
    if (!toDelete) {
      setMovieToFavorite(movie);
    } else {
      if (movie._id) {
        setMovieToDelFromFavorite(movie);
      } else {
        // setMovieToDelFromFavorite(movie);
        console.log('onFavorite in App TO DELETE', movie);
      }
    }
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
            isShortLength={isShortLength}
            handleIsShortLength={handleIsShortLength}
            moviesToRender={moviesToRender}
            onShowMore={onMoviesShowMore}
            isShowMoreBtn={isShowMoreBtn}
            onFavorite={onFavorite}
            handleMovieMenuClick={handleMovieMenuClick}
            myMovies={myMovies}
            onClearSearch={onClearSearchMovies}
            keyWord={keyWord}
            isMyMoviesUpdated={isMyMoviesUpdated}
            component={Movies}
          />
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            onSearch={onSearchMyMovies}
            isTokenChecked={isTokenChecked}
            myMoviesToRender={myMoviesToRender}
            handleIsShortLength={handleIsShortLength}
            isShortLength={isShortLength}
            handleMovieMenuClick={handleMovieMenuClick}
            myMovies={myMovies}
            onClearSearch={onClearSearchMyMovies}
            onFavorite={onFavorite}
            keyWord={myKeyWord}
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

// let indexOfUpdatedMovieInAllMovies;
// const updatedMovie = allMovies.find((movie) => {
//   indexOfUpdatedMovieInAllMovies = allMovies.indexOf(movie);
//   return movie.movieId === res.data.movieId;
// });
//
// allMovies[indexOfUpdatedMovieInAllMovies].isFavorite = true;
// allMovies.splice(indexOfUpdatedMovieInAllMovies, 1, updatedMovie);
//

// main api get my movies  ----------------------------------

// useEffect(() => {
//   const getUserAndMyMovies = (token) => {
//     mainApi
//       .getUserAndMyMovies(token)
//       .then(([user, myMovies]) => {
//         // setCurrentUser(user);//??????
//         // setMyMovies(myMovies);
//         // setMyMoviesSearchResult(myMovies);
//         // setMyMoviesToRender([]); //???????????????????
//       })
//       .catch((errStatus) => handleError(errStatus, setErrorMsg));
//   };
//   token && getUserAndMyMovies(token);
// }, [token, isMyMoviesUpdated]);
