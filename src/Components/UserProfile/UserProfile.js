import React, { Component } from 'react'
import {
    doGetAllUserMovies,
    doDeleteMovie,
    doGetAllFriends,
    doDeleteFriend,
    doAddStoreFile,
    doUpdateUserPic,
    doGetUser,
    getUserPic
} from '../../Firebase/Users'
import { withRouter } from 'react-router-dom'
import './UserProfile.css'
import MovieThumb from '../MovieThumb/MovieThumb'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Modal from '../Modal/Modal'
import FriendsCard from '../FriendsCard/FriendsCard'
import './UserProfile.css'


class UserProfile extends Component {
    state = {
        movies: [],
        isShowing: false,
        friends: [],
    }


    componentDidMount = () => {
        //withRouter higherlevel component getting match is getting id in the path in app.router
        doGetAllUserMovies(this.props.match.params.id)
            .then(userSnapShot =>
                doGetAllFriends(this.props.match.params.id)
                    .then(async friendSnapShot => {
                        friendSnapShot.docs.map(f => {
                            doGetUser(f.data().id)
                                //asigning the data, uid to the friend after getting it by the id
                                .then(d =>
                                    this.setState({ friends: [...this.state.friends, Object.assign(d.data(), { uid: f.id, linkToFriendId: f.data().id, name: f.data() })] })
                                )
                        })
                        this.setState({
                            movies: userSnapShot.docs.map(d => Object.assign(d.data(), { uid: d.id }))
                        })

                    })
            )
    }

    addProfilePicture = (event) => {
        //getting first
        const file = event.target.files[0]
        // selectedFile: event.target.files[0]
        doAddStoreFile(file)
            .then(file => file.ref.getDownloadURL()
                .then(url => doUpdateUserPic(this.props.currentUser.id, (url))))
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
        console.log('this is the deleteFriend', friendId)
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
        // const profilePic = this.props.currentUser.fileRef
        return (
            <div className="grid-container">
                <div className="item1">
                    <h2 header={'Want to See'}>Movies You Want To See:</h2>
                    <div className="movie-container">
                        {this.state.movies.map((element, i) => (
                            <div className="profile-movies" key={i}>
                                <MovieThumb
                                    key={i}
                                    clickable={true}
                                    image={element.picture ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.picture}` : './images/no_image.jpg'}
                                    movieId={element.id}
                                    movieName={element.original_title}
                                />
                                <Modal 
                                    isUser={isUser} 
                                    deleteMovie={this.deleteMovie} 
                                    movieId={element.uid} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="item2">
                    <div className="grid">
                        <h2>Friends</h2>
                        <div>
                            <input type='file' onChange={this.addProfilePicture} />
                        </div>
                        {this.state.friends.map((f, i) => (
                            <div className="friends-list" key={i}>
                                <FriendsCard
                                    isUser={isUser}
                                    friend={f}
                                    deleteFriend={this.deleteFriend}
                                    friendId={f.uid}
                                />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserProfile)