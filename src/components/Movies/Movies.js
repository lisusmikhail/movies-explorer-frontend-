import React, { useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
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
    onFavorite,
    handleMovieMenuClick,
    myMovies,
    onClearSearch,
    keyWord,
    isMyMoviesUpdated,
    isLoader,
    searchResultInfo,
  } = props;

  // console.log(moviesToRender);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleMovieMenuClick={handleMovieMenuClick}
      />
      <div className='movies'>
        {isLoader && <Preloader />}
        <SearchForm
          onSearch={onSearch}
          isShortLength={isShortLength}
          handleIsShortLength={handleIsShortLength}
          onClearSearch={onClearSearch}
          keyWord={keyWord}
          searchResultInfo={searchResultInfo}
        />
        <MoviesCardList
          favoriteOnly={false}
          moviesToRender={moviesToRender}
          onShowMore={onShowMore}
          isShowMoreBtn={isShowMoreBtn}
          onFavorite={onFavorite}
          pageName={'allMovies'}
          myMovies={myMovies}
          isMyMoviesUpdated={isMyMoviesUpdated}
        />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
