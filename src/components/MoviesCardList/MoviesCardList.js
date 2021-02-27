import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ favoriteOnly, searchResultToShow }) {
  console.log(searchResultToShow);
  return (
    <section className='movies-card-list movies-card-list_position'>
      <>
        {searchResultToShow.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id}
            favoriteOnly={favoriteOnly}
          />
        ))}
      </>
      <button type='button' className='movies-card-list__more-button'>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
// <MoviesCard movie={movie} key={movie.id} favoriteOnly={favoriteOnly} />
