import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
// import Navigation from '../Navigation/Navigation';
import MovieInfo from '../MovieInfo/MovieInfo';
import { withRouter } from 'react-router-dom'

import Grid from '../Grid/Grid';
import Actor from '../Actor/Actor';
import Spinner from '../Spinner/Spinner';
import './Movie.css';
import FontAwesome from 'react-fontawesome';
import { database } from 'firebase';

import {
  Icon
} from "semantic-ui-react";


import { doAddMovieToWatchList, doGetAllUserMovies } from '../../Firebase/Users'

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    userMovies: [],
    movies: [],
    loading: true,
    isClicked: true
  }

  isClicked = () => 
  this.setState({ isClicked: this.state.userMovies.some( m => m.id === this.state.movie.id), loading: false })
 
  componentDidMount() {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;

    // if (localStorage.getItem(`${movieId}`)) {
    //   let state = JSON.parse(localStorage.getItem(`${movieId}`))
    //   this.setState({ ...state })
    // } else {
      // this.setState({ loading: true })
      // First fetch the movie ...
      let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    // }

    this.props.currentUser.id && doGetAllUserMovies(this.props.currentUser.id)
      .then(snapShot => {this.setState({ 
        userMovies: snapShot.docs.map(m => Object.assign(m.data(), {uid: m.id})),
      })
      this.isClicked()
    })

    // Get User's Movies
    // doGetAllUserMovies(this.props.currentUser.id)
    // setState to update userMovies
    // After getting userMovies check to see if this movie has already been selected
    // for (let index = 0; index < this.state.userMovies.length; index++) {
    //   const movie = this.state.userMovies[index];
    //   if(movie.id === movieId) {
    //     // hide the button
    //     document.querySelectorAll('.ui.positive.button')[0].style.display = 'none';
    //   }
    // }
    // doGetAllUserMovies(this.props.currentUser.id)
    //         .then(res => this.setState({ movies: res.docs.map(d => Object(d.data(), {uid: d.id})) }))
  }

  toWatchList = () => {
    const movie = {
      id: this.state.movie.id,
      title: this.state.movie.original_title,
      picture: this.state.movie.poster_path,
      toWatch: true
    }
    doAddMovieToWatchList(this.props.currentUser.id, movie)
    this.setState({isClicked: true})
  }


  fetchItems = async endpoint => {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;
    try {
      const result = await (await fetch(endpoint)).json()
      if (result.status_code) {
        // If we don't find any movie
        // this.setState({ loading: false });
      } else {
        this.setState({ movie: result })
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json()
        const directors = creditsResult.crew.filter((member) => member.job === "Director");
        this.setState({
          // ... then fetch actors in the setState callback function
          actors: creditsResult.cast,
          directors,
          // loading: false
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
    const { movie, directors, actors, loading, isClicked } = this.state;

    console.log(this.state.loading)

    

    return (
      <div>
        {
          !loading && 
            <div className="rmdb-movie">
              {/* make it so it toggles and users cant add more to it */}
              {movie ? <div>{/* <Navigation movie={movieName} /> */} <MovieInfo isClicked={isClicked}toWatchList={this.toWatchList} movie={movie} /></div>
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
        {/* <MovieInfo toWatchList={this.toWatchList}/> */}
      </div>

    )

  }
}

export default withRouter(Movie);