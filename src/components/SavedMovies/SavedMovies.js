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
    myMoviesToRender,
    onShowMore,
    handleIsShortLength,
    isShortLength,
    handleMovieMenuClick,
    myMovies,
    onSearch,
    onClearSearch,
    keyWord,
    onFavorite,
    isLoader,
    searchResultInfo,
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
        />
        <MoviesCardList
          favoriteOnly={false}
          onShowMore={onShowMore}
          resultToRender={myMoviesToRender}
          moviesToRender={myMoviesToRender}
          onFavorite={onFavorite}
          pageName={'myMovies'}
          myMovies={myMovies}
        />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
