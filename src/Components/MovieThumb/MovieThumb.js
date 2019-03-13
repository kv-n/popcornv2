import React from 'react';
import { Link } from 'react-router-dom';
import './MovieThumb.css';

const MovieThumb = (props) => {
  return (
    <div className="rmdb-moviethumb style_prevu_kit">
      {props.clickable ?
        <Link to={{ pathname: `/movies/${props.movieId}`, movieName: `${props.movieName}` }}>
          <img className="movie-img" src={props.image} alt="moviethumb" />
        </Link>
        :
        <img className="movie-img" src={props.image} alt="moviethumb" />
      }

    </div>
  )
}

export default MovieThumb;