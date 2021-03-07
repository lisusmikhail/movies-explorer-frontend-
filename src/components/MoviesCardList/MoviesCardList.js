import React, { useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  favoriteOnly,
  moviesToRender,
  onShowMore,
  isShowMoreBtn,
  onFavorite,
  pageName,
  myMovies,
  isMyMoviesUpdated,
}) {
  return (
    <section className='movies-card-list movies-card-list_position'>
      <>
        {moviesToRender &&
          moviesToRender.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie._id || movie.movieId}
              favoriteOnly={favoriteOnly}
              onFavorite={onFavorite}
              pageName={pageName}
              myMovies={myMovies}
              isMyMoviesUpdated={isMyMoviesUpdated}
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
