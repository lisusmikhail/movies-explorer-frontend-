import React, { useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  const { isLoggedIn, onSearch, isShortLength, setIsShortLength } = props;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className='movies'>
        <SearchForm
          onSearch={onSearch}
          isShortLength={isShortLength}
          setIsShortLength={setIsShortLength}
        />
        <MoviesCardList favoriteOnly={false} />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
