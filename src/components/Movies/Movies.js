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
    onCheckBox,
    isShortLength,
    handleIsShortLength,
    handleIsFirstRender,
    resultToRender,
    onShowMore,
    isShowMoreBtn,
    onAddFavorite,
  } = props;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
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
          resultToRender={resultToRender}
          onShowMore={onShowMore}
          isShowMoreBtn={isShowMoreBtn}
          onAddFavorite={onAddFavorite}
          pageName={'allMovies'}
        />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
