import React, { Component } from 'react'
import { doGetAllUserMovies, doDeleteMovie } from '../../Firebase/Users'
import { withRouter, Link } from 'react-router-dom'
import Grid from '../Grid/Grid'
import './UserProfile.css'
import MovieThumb from '../MovieThumb/MovieThumb'
import { db } from '../../Firebase/Firebase';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';

class UserProfile extends Component {
    state = {
        movies: [],
    }

    componentDidMount = () => {
        doGetAllUserMovies(this.props.match.params.id)
            .then(res => this.setState({ movies: res.docs.map(d => Object.assign(d.data(), { uid: d.id })) }))
    }

    deleteMovie = (movieId) => {
        //getting users from params.id and getting the movieId
        doDeleteMovie(this.props.match.params.id, movieId)
            .then(() => {
                //filtering the deleted movie being checked against movieId
                console.log('movie deleted')
                this.setState({ movies: this.state.movies.filter(m => m.uid !== movieId) })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div>
                    <h4 header={'Want to See'}>Movies You Want To See:
                        <div className="profile--movies">
                            {this.state.movies.map((element, i) => (
                                <div>
                                <MovieThumb
                                    key={i}
                                    clickable={true}
                                    image={element.picture ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.picture}` : './images/no_image.jpg'}
                                    movieId={element.id}
                                    movieName={element.original_title}
                                />
                                <button onClick={() => this.deleteMovie(element.uid)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </h4>
                </div>

            </div>
        )
    }
}

export default withRouter(UserProfile)