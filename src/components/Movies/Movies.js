import React from 'react';
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
    onShowMore,
    isShowMoreBtn,
    onFavorite,
    handleMovieMenuClick,
    onClearSearch,
    keyWord,
    isLoader,
    searchResultInfo,
    searchResultError,
    moviesFilteredResult,
    lastIndex,
    isClearBtn,
  } = props;

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
          searchResultError={searchResultError}
          isClearBtn={isClearBtn}
        />
        <MoviesCardList
          moviesFilteredResult={moviesFilteredResult}
          lastIndex={lastIndex}
          onShowMore={onShowMore}
          isShowMoreBtn={isShowMoreBtn}
          onFavorite={onFavorite}
        />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
