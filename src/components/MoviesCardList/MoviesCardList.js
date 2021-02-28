import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  favoriteOnly,
  resultToShow,
  onShowMore,
  isShowMoreBtn,
}) {
  return (
    <section className='movies-card-list movies-card-list_position'>
      <>
        {resultToShow &&
          resultToShow.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id}
              favoriteOnly={favoriteOnly}
            />
          ))}
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
