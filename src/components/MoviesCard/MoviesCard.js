import React from 'react';
import './MoviesCard.css';
import firstImg from '../../images/pic__COLOR_pic.png';
import heart from '../../images/icon__heart_empty.png';
import activeHeart from '../../images/icon__heart_active.png';

function MoviesCard(props) {
  const { title, img, duration, isFavorite } = props;
  return (
    <div className='movies-card'>
      <div className='movies-card__info'>
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>{title}</h2>
          <p className='movies-card__duration'>{duration}</p>
        </div>
        <img
          className='movies-card__favorite'
          src={isFavorite ? activeHeart : heart}
          alt={title}
        />
      </div>
      <img className='movies-card__poster' src={img} alt={title} />
    </div>
  );
}

export default MoviesCard;
