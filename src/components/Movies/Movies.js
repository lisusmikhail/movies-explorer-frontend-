import React, { useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  const {
    isLoggedIn,
    onSearch,
    onCheckBox,
    isShortLength,
    handleIsShortLength,
    handleIsFirstRender,
    moviesToRender,
    onShowMore,
    isShowMoreBtn,
    onAddFavorite,
    handleMovieMenuClick,
    myMovies,
    location,
  } = props;
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleMovieMenuClick={handleMovieMenuClick}
      />
      <div className='movies'>
        <SearchForm
          onSearch={onSearch}
          onCheckBox={onCheckBox}
          isShortLength={isShortLength}
          handleIsFirstRender={handleIsFirstRender}
          handleIsShortLength={handleIsShortLength}
        />
        <MoviesCardList
          favoriteOnly={false}
          moviesToRender={moviesToRender}
          onShowMore={onShowMore}
          isShowMoreBtn={isShowMoreBtn}
          onAddFavorite={onAddFavorite}
          pageName={'allMovies'}
          myMovies={myMovies}
          location={location}
        />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
