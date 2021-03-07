import React, { useState, useEffect } from 'react';
import './MoviesCard.css';
import heart from '../../images/icon__heart_empty.png';
import activeHeart from '../../images/icon__heart_active.png';
import delFavorite from '../../images/icon__del_favorite.svg';

function MoviesCard(props) {
  const {
    movie,
    favoriteOnly,
    onFavorite,
    pageName,
    myMovies,
    isMyMoviesUpdated,
  } = props;
  const { nameRU, image, duration, trailer, isFavorite } = movie;

  const handleFavorite = () => {
    const toDelete = () => {
      if (movie.isFavorite) {
        console.log(movie);
        return true;
      } else return !!movie._id;
    };
    onFavorite(movie, toDelete());
  };

  useEffect(() => {
    // console.log('current value= ', movie.isFavorite);
  }, [isMyMoviesUpdated]);

  let isVisible = true;

  return (
    <div
      className={
        isVisible
          ? 'movies-card movies-card_position'
          : 'movies-card movies-card_visibility'
      }
    >
      <div className='movies-card__info'>
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>{nameRU}</h2>
          <p className='movies-card__duration'>{duration}</p>
        </div>
        <img
          className='movies-card__favorite'
          src={
            isFavorite
              ? activeHeart
              : isFavorite === undefined
              ? delFavorite
              : heart
          }
          alt={nameRU}
          onClick={handleFavorite}
        />
      </div>
      <a className='movies-card__poster-link' href={trailer} target='_blank'>
        <img className='movies-card__poster' src={image} alt={nameRU} />
      </a>
    </div>
  );
}

export default MoviesCard;
