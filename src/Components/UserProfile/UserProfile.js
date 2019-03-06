import React, { Component } from 'react'
import { doGetAllUserMovies, doDeleteMovie } from '../../Firebase/Users'
import { withRouter, Link } from 'react-router-dom'
import Grid from '../Grid/Grid'
import './UserProfile.css'
import { db } from '../../Firebase/Firebase';

class UserProfile extends Component {
    state = {
        movies: [],
    }

    componentDidMount = () => {
        doGetAllUserMovies(this.props.match.params.id)
            .then(res => this.setState({ movies: res.docs.map(d => Object.assign(d.data(), {uid: d.id})) }))
    }

    deleteMovie = (movieId) => {
        //getting users from params.id and getting the movieId
        doDeleteMovie(this.props.match.params.id, movieId)
            .then(() => {
                //filtering the deleted movie being checked against movieId
                console.log('movie deleted')
                this.setState({movies: this.state.movies.filter(m => m.uid !== movieId)})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>

                <div>
                    <Grid header={'Want to See'}>
                        {
                            this.state.movies.map(m => <Link to={`/movies/${m.id}`}>{m.title}</Link>)
                        }
                    </Grid>
                </div>

                <div>
                    <h4 className="movieToSee" header={'Want to See'}>
                        {
                            this.state.movies.map(m => 
                                <p>
                                    <Link to={`/movies/${m.id}`}>{m.title}</Link>
                                    <button onClick={() => this.deleteMovie(m.uid)}>Delete</button>
                                </p>
                            )
                        }
                    </h4>
                </div>

            </div>
        )
    }
}

export default withRouter(UserProfile)