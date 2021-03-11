import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  onShowMore,
  isShowMoreBtn,
  onFavorite,
  moviesFilteredResult,
  lastIndex,
  location,
}) {
  return (
    <section className='movies-card-list movies-card-list_position'>
      <>
        {moviesFilteredResult &&
          moviesFilteredResult.map((movie, index) => {
            if (index <= lastIndex) {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie._id || movie.movieId}
                  onFavorite={onFavorite}
                  location={location}
                />
              );
            } else {
              return null;
            }
          })}
      </>
      {isShowMoreBtn && (
        <button
          type='button'
          className='movies-card-list__more-button'
          onClick={onShowMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
