import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './MoviesCard.css';
import heart from '../../images/icon__heart_empty.png';
import activeHeart from '../../images/icon__heart_active.png';
import delFavorite from '../../images/icon__del_favorite.svg';
import { timeConversion } from '../../utils/helpers';

function MoviesCard(props) {
  const { movie, onFavorite } = props;
  const { nameRU, image, duration, trailer, _id } = movie;
  const [myHeart, setMyHeart] = useState('');
  const history = useHistory();
  const location = history.location.pathname;

  const durationToDisplay = timeConversion(duration);

  useEffect(() => {
    if (location === '/saved-movies') {
      setMyHeart(delFavorite);
    } else {
      setMyHeart(activeHeart);
    }
  }, [location]);

  function handleFavorite() {
    onFavorite(movie);
  }

  return (
    <div className={'movies-card movies-card_position'}>
      <div className='movies-card__info'>
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>{nameRU}</h2>
          <p className='movies-card__duration'>{durationToDisplay}</p>
        </div>
        <img
          className='movies-card__favorite'
          src={!_id ? heart : myHeart}
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
