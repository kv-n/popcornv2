import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import MovieInfo from '../MovieInfo/MovieInfo';
import { withRouter } from 'react-router-dom'

import Grid from '../Grid/Grid';
import Actor from '../Actor/Actor';
import Spinner from '../Spinner/Spinner';
import './Movie.css';

import { 
  doAddMovieToWatchList, 
  doGetAllUserMovies,
  doRemoveFromWatchList,
  addMovie
} from '../../Firebase/Users'

class Movie extends Component {
  state = {
    movie: {},
    actors: [],
    directors: [],
    userMovies: [],
    movies: [],
    loading: true,
    buttonLoading: false,
    isClicked: true
  }

  isClicked = () =>
    this.setState({ isClicked: this.state.userMovies.some(m => m.id === parseInt(this.props.match.params.movieId)), loading: false })

  componentDidMount() {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;
    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);

    this.props.currentUser.id ? doGetAllUserMovies(this.props.currentUser.id)
      .then(async snapShot => {
        this.setState({
          userMovies: await snapShot.docs.map(m => Object.assign(m.data(), { uid: m.id })),
        })
        this.isClicked()
      })
      : this.setState({loading: false})
  }

  toWatchList = () => {
    this.setState({buttonLoading: true})
    const movie = {
      id: this.state.movie.id,
      title: this.state.movie.original_title,
      picture: this.state.movie.poster_path,
      toWatch: true
    }
    // doAddMovieToWatchList(this.props.currentUser.id, movie)
    //   .then(() => this.setState({buttonLoading: false, isClicked: true}))
    addMovie(movie)
  }

  removeFromWatchList = () => {
    this.setState({ buttonLoading: true })
    doRemoveFromWatchList(this.props.currentUser.id, parseInt(this.props.match.params.movieId))
      .then(() => this.setState({buttonLoading: false, isClicked: false}))
  }


  fetchItems = async endpoint => {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;
    try {
      const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
      const creditsResult = await (await fetch(creditsEndpoint)).json()
      const result = await (await fetch(endpoint)).json()
      if (result.status_code) {
      } else {
        this.setState({ 
          movie: result,
          actors: creditsResult.cast
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    // ES6 Destructuring the props and state
    const { 
      movie, 
      actors, 
      loading, 
      isClicked,
      buttonLoading
    } = this.state;

    return (
      <div>
        {
          !loading &&
          <div className="rmdb-movie">
            {movie 
              ? <div>
                  <MovieInfo 
                    isClicked={isClicked} 
                    toWatchList={this.toWatchList} 
                    movie={movie}
                    removeFromWatchList={this.removeFromWatchList}
                    buttonLoading={buttonLoading}
                  />
                </div>
              : null}
            {actors ?
              <div className="rmdb-movie-grid">
                <Grid header={'Actors'}>
                  {actors.map((element, i) => (
                    i < 8 ? <Actor key={i} actor={element} /> : ""
                  ))}
                </Grid>
              </div>
              : null}
            {!actors && !loading ? <h1>No movie found</h1> : null}
            {loading ? <Spinner /> : null}
          </div>
        }
      </div>

    )

  }
}

export default withRouter(Movie);