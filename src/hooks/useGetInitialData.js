import { useState, useEffect } from 'react';
import { handleError } from '../utils/ErrorHandler';
import { moviePreparation } from '../utils/helpers';
import * as mainApi from '../utils/MainApi';

function useGetInitialData(
  token,
  isMyMoviesUpdated,
  setErrorMsg,
  setSearchResultError,
  setIsLoader
) {
  const [initialUser, setInitialUser] = useState({});
  const [initialMyMovies, setInitialMyMovies] = useState([]);
  const [initialAllMovies, setInitialAllMovies] = useState([]);
  const [readyToUseAllMovies, setReadyYoUseAllMovies] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const getInitialData = (token) => {
      setIsLoader(true);
      mainApi
        .getInitialData(token)
        .then(([user, myMovies, allMovies]) => {
          setInitialUser(user);
          setInitialMyMovies(myMovies);
          setInitialAllMovies(allMovies);
          setIsDataReady(true);
        })
        .catch((err) => {
          if (err.message === 'Failed to fetch') {
            handleError(503, setSearchResultError);
          } else if (err.url.indexOf('movie')) {
            handleError(err, setSearchResultError);
          } else {
            handleError(err.status, setSearchResultError);
          }
        })
        .finally(() => setIsLoader(false));
    };
    token && getInitialData(token);
  }, [token, isMyMoviesUpdated]);

  useEffect(() => {
    const tempArr = [];
    initialAllMovies.forEach((movie) => {
      const readyToStoreMovie = moviePreparation(movie);
      const isFavorite = initialMyMovies.filter((myMovie) => {
        return myMovie.movieId === movie.id;
      });

      if (isFavorite.length > 0) {
        readyToStoreMovie._id = isFavorite[0]._id;
      }

      tempArr.push(readyToStoreMovie);
    });
    setReadyYoUseAllMovies(tempArr);
  }, [isDataReady]);

  return { initialUser, readyToUseAllMovies, initialMyMovies };
}

export default useGetInitialData;
