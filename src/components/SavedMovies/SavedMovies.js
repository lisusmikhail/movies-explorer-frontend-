import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <div className='movies'>
      <SearchForm />
      <MoviesCardList />
    </div>
  );
}

export default SavedMovies;
