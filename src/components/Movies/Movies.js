import React, { useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  const {
    isLoggedIn,
    onSearch,
    isShortLength,
    handleIsShortLength,
    moviesToRender,
    onShowMore,
    isShowMoreBtn,
    onAddFavorite,
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
          onSearch={onSearch}
          isShortLength={isShortLength}
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
        />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
