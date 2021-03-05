import React from 'react';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  const {
    isLoggedIn,
    myMoviesToRender,
    onShowMore,
    handleIsFirstRender,
    handleIsShortLength,
    isShortLength,
    handleMovieMenuClick,
    myMovies,
  } = props;

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleMovieMenuClick={handleMovieMenuClick}
      />
      <div className='movies'>
        <SearchForm
          handleIsFirstRender={handleIsFirstRender}
          handleIsShortLength={handleIsShortLength}
          isShortLength={isShortLength}
        />
        <MoviesCardList
          favoriteOnly={false}
          onShowMore={onShowMore}
          resultToRender={myMoviesToRender}
          moviesToRender={myMoviesToRender}
          pageName={'myMovies'}
          myMovies={myMovies}
        />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
