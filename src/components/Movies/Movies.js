import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList favoriteOnly={false} />
    </div>
  );
}

export default Movies;
