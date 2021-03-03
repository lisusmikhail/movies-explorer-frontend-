import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  favoriteOnly,
  moviesToRender,
  onShowMore,
  isShowMoreBtn,
  onAddFavorite,
  pageName,
}) {
  console.log({ moviesToRender });

  return (
    <section className='movies-card-list movies-card-list_position'>
      <>
        {moviesToRender &&
          moviesToRender.map((movie) => (
            <MoviesCard
              movie={movie}
              key={pageName === 'myMovies' ? movie._id : movie.id}
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
