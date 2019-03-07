import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import PropTypes from 'prop-types';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

const MovieInfo = ({ movie, toWatchList, isClicked }) => (

  <div className="rmdb-movieinfo"
    style={{
      background: movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')` : '#000'
    }}
  >
    <div className="rmdb-movieinfo-content">
      <div className="rmdb-movieinfo-thumb">
        <MovieThumb
          image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.jpg'}
          clickable={false}
        />
      </div>
      <div className="rmdb-movieinfo-text">
        <h1>{movie.title}</h1>
        <h3>PLOT</h3>
        <p>{movie.overview}</p>
        <h3>IMDB RATING</h3>
        <div className="rmdb-rating">
          <meter min="0" max="100" optimum="100" low="40" high="70" value={ movie.vote_average * 10}></meter>
          <p className="rmdb-score">{movie.vote_average}</p>
        </div> {
          
          !isClicked && <button onClick={toWatchList}>ADD THIS</button>
        }
          
      </div>
    </div>
  </div>
)

MovieInfo.propTypes = {
  movie: PropTypes.object,
  directors: PropTypes.array
}

export default MovieInfo;