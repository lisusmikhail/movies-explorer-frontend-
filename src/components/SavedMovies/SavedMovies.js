import React from 'react';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
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
  } = props;

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleMovieMenuClick={handleMovieMenuClick}
      />
      <div className='movies'>
        <SearchForm
          handleIsShortLength={handleIsShortLength}
          isShortLength={isShortLength}
          onSearch={onSearch}
          onClearSearch={onClearSearch}
          keyWord={keyWord}
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
