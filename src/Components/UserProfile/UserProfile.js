import React, { Component } from 'react'
import { doGetAllUserMovies, doDeleteMovie, doGetAllFriends, doDeleteFriend } from '../../Firebase/Users'
import { withRouter, Link } from 'react-router-dom'
import './UserProfile.css'
import MovieThumb from '../MovieThumb/MovieThumb'
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import Modal from '../Modal/Modal'
import './UserProfile.css'


class UserProfile extends Component {
    state = {
        movies: [],
        isShowing: false,
        friends: []
    }


    componentDidMount = () => {
        //withRouter higherlevel component getting match is getting id in the path in app.router
        doGetAllUserMovies(this.props.match.params.id)
            .then(res => this.setState({ movies: res.docs.map(d => Object.assign(d.data(), { uid: d.id })) }))
        doGetAllFriends(this.props.match.params.id)
            .then(res => this.setState({ friends: res.docs.map(d => Object.assign(d.data(), { uid: d.id })) }))
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

    deleteFriend = (friendId) => {
        doDeleteFriend(this.props.match.params.id, friendId)
            .then(() => {
                this.setState({ friends: this.state.friends.filter(f => f.uid !== friendId) })
            })
            .catch(err => {
                console.log(err)
            })

    }



    render() {
        const isUser = this.props.currentUser.id === this.props.match.params.id
        console.log(isUser)
        return (
                <div className="grid">
                    <div className="grid-container">
                        <div className="item1">
                            <h2 header={'Want to See'}>Movies You Want To See:</h2>
                            {this.state.movies.map((element, i) => (
                                <div className="profile-movies" key={i}>
                                    <MovieThumb
                                        key={i}
                                        clickable={true}
                                        image={element.picture ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.picture}` : './images/no_image.jpg'}
                                        movieId={element.id}
                                        movieName={element.original_title}
                                    />
                                    <Modal isUser={isUser}  deleteMovie={this.deleteMovie} movieId={element.uid} />
                                </div>
                            ))}
                        </div>

                        <div className="item2">
                            <h2>Friends</h2>
                            {this.state.friends.map((f, i) => (
                                <div key={i}>
                                    <Link to={`/profile/${f.id}`}>{f.username}</Link>
                                    {this.props.currentUser.id !== f.id
                                    ? (
                                        <Modal deleteFriend={this.deleteFriend} friendId={f.uid} />
                                    )
                                    :(
                                        <div/>
                                    )
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(UserProfile)