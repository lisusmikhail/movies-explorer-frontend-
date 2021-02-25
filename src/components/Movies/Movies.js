import React, { useEffect } from 'react';
import './Movies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies(props) {
  // console.log(props);
  return (
    <>
      <Header />
      <div className='movies'>
        <SearchForm />
        <MoviesCardList favoriteOnly={false} />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
