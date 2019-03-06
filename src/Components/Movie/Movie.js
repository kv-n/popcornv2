import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
// import Navigation from '../Navigation/Navigation';
import MovieInfo from '../MovieInfo/MovieInfo';
import { withRouter } from 'react-router-dom'

import Grid from '../Grid/Grid';
import Actor from '../Actor/Actor';
import Spinner from '../Spinner/Spinner';
import './Movie.css';
import { database } from 'firebase';


import { doAddMovieToWatchList, doGetAllUserMovies } from '../../Firebase/Users'

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  }

  componentDidMount() {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;

    if (localStorage.getItem(`${movieId}`)) {
      let state = JSON.parse(localStorage.getItem(`${movieId}`))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      // First fetch the movie ...
      let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }
  }

  toWatchList = () => {
    const movie = {
      id: this.state.movie.id,
      title: this.state.movie.original_title,
      toWatch: true
    }
    doAddMovieToWatchList(this.props.currentUser.id, movie)
  }


  fetchItems = async endpoint => {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;
    try {
      const result = await (await fetch(endpoint)).json()
      if (result.status_code) {
        // If we don't find any movie
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result })
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json()
        const directors = creditsResult.crew.filter((member) => member.job === "Director");
        this.setState({
          // ... then fetch actors in the setState callback function
          actors: creditsResult.cast,
          directors,
          loading: false
        }, () => {
          localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    // ES6 Destructuring the props and state
    const { movieName } = this.props.location;
    const { movie, directors, actors, loading } = this.state;

    return (
      <div className="rmdb-movie">

        {/* make it so it toggles and users cant add more to it */}
        <button onClick={this.toWatchList}>watch</button>


        {movie ?
          <div>
            {/* <Navigation movie={movieName} /> */}
            <MovieInfo movie={movie} />
          </div>
          : null}
        {actors ?
          <div className="rmdb-movie-grid">
            <Grid header={'Actors'}>
              {actors.map((element, i) => (
                i < 4 ? <Actor key={i} actor={element} /> : ""
              ))}
            </Grid>
          </div>
          : null}
        {!actors && !loading ? <h1>No movie found</h1> : null}
        {loading ? <Spinner /> : null}
      </div>
    )
  }
}

export default withRouter(Movie);