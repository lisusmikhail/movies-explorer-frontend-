import React from 'react';
import './SavedMovies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  const { isLoggedIn, myMoviesToRender, isShowMoreBtn, onShowMore } = props;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className='movies'>
        <SearchForm />
        <MoviesCardList
          favoriteOnly={false}
          onShowMore={onShowMore}
          resultToRender={myMoviesToRender}
          isShowMoreBtn={isShowMoreBtn}
          pageName={'myMovies'}
        />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
