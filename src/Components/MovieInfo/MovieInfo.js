import React from 'react'
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config'
import PropTypes from 'prop-types'
import MovieThumb from '../MovieThumb/MovieThumb'
import './MovieInfo.css'
import { Button } from 'semantic-ui-react'

const MovieInfo = ({ movie, toWatchList, isClicked, removeFromWatchList, buttonLoading }) => (
  <div className='info-movieinfo'
    style={{
      background: movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')` : '#000'
    }}
  >
    <div className='info-movieinfo-content'>
      <div className='info-movieinfo-thumb'>
        <MovieThumb
          image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.jpg'}
          clickable={false}
        />
      </div>
      <div className='info-movieinfo-text'>
        <h1>{movie.title}</h1>
        <h3>PLOT</h3>
        <p>{movie.overview}</p>
        <h3>IMDB RATING</h3>
        <div className='info-rating'>
          <meter min='0' max='100' optimum='100' low='40' high='70' value={(movie.vote_average * 10).toString()} />
          <p className='info-score'>{movie.vote_average}</p>
        </div> {
          <Button
            onClick={!isClicked ? toWatchList : removeFromWatchList}
            loading={buttonLoading}
            color={!isClicked ? 'green' : 'red'}
            icon='eye'
            content={!isClicked ? 'Add To Watch List' : 'Remove from Watch List'}
          />
        }

      </div>
    </div>
  </div>
)

MovieInfo.propTypes = {
  movie: PropTypes.object,
  directors: PropTypes.array
}

export default MovieInfo
