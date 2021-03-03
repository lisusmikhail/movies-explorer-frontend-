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
    isShowMoreBtn,
    onShowMore,
    handleIsFirstRender,
    handleIsShortLength,
    onCheckBox,
    isShortLength,
    handleMovieMenuClick,
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
          onCheckBox={onCheckBox}
        />
        <MoviesCardList
          favoriteOnly={false}
          onShowMore={onShowMore}
          resultToRender={myMoviesToRender}
          isShowMoreBtn={isShowMoreBtn}
          moviesToRender={myMoviesToRender}
          pageName={'myMovies'}
        />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
