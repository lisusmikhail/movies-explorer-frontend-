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
    setIsShortLength,
    setIsFirstRender,
    resultToShow,
    onShowMore,
    isShowMoreBtn,
  } = props;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className='movies'>
        <SearchForm
          onSearch={onSearch}
          isShortLength={isShortLength}
          setIsShortLength={setIsShortLength}
          setIsFirstRender={setIsFirstRender}
        />
        <MoviesCardList
          favoriteOnly={false}
          resultToShow={resultToShow}
          onShowMore={onShowMore}
          isShowMoreBtn={isShowMoreBtn}
        />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
