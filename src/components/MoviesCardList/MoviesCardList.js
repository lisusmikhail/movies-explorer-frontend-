import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  favoriteOnly,
  resultToRender,
  onShowMore,
  isShowMoreBtn,
  onAddFavorite,
  pageName,
}) {
  console.log(resultToRender);

  return (
    <section className='movies-card-list movies-card-list_position'>
      <>
        {resultToRender &&
          resultToRender.map((movie) => (
            <MoviesCard
              movie={movie}
              key={`${pageName} + ${movie.id}`}
              favoriteOnly={favoriteOnly}
              onAddFavorite={onAddFavorite}
              pageName={pageName}
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
