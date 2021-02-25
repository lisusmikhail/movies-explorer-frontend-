import React from 'react';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <>
      <Header />
      <div className='movies'>
        <SearchForm />
        <MoviesCardList favoriteOnly={true} />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
