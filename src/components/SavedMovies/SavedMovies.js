import React from 'react';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  const {
    isLoggedIn,
    onShowMore,
    handleIsShortLength,
    isShortLength,
    handleMovieMenuClick,
    onSearch,
    onClearSearch,
    keyWord,
    onFavorite,
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
          handleIsShortLength={handleIsShortLength}
          isShortLength={isShortLength}
          onSearch={onSearch}
          onClearSearch={onClearSearch}
          keyWord={keyWord}
          searchResultInfo={searchResultInfo}
          searchResultError={searchResultError}
          isClearBtn={isClearBtn}
        />
        <MoviesCardList
          onShowMore={onShowMore}
          moviesFilteredResult={moviesFilteredResult}
          lastIndex={lastIndex}
          onFavorite={onFavorite}
        />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
