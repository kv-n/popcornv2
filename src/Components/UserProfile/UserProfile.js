import React, { Component } from 'react'
import { doGetAllUserMovies, doDeleteMovie, doGetAllFriends } from '../../Firebase/Users'
import { withRouter, Link } from 'react-router-dom'
import Grid from '../Grid/Grid'
import './UserProfile.css'
import MovieThumb from '../MovieThumb/MovieThumb'
import { db } from '../../Firebase/Firebase';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
// import { Modal } from 'semantic-ui-react';
import Modal from '../Modal/Modal'

class UserProfile extends Component {
    state = {
        movies: [],
        isShowing: false,
        friends:[]
    }

    
    componentDidMount = () => {
        //withRouter higherlevel component getting match is getting id in the path in app.router
        doGetAllUserMovies(this.props.match.params.id)
            .then(res => this.setState({ movies: res.docs.map(d => Object.assign(d.data(), { uid: d.id })) }))
        doGetAllFriends(this.props.match.params.id)
            .then(res =>this.setState({ friends: res.docs.map(d => Object.assign(d.data(), { uid: d.id })) }))
    }
    
    // openModalHandler = () => {
    //     this.setState({
    //         isShowing: true
    //     })
    // }

    // closeModalHandler = () => {
    //     this.setState({
    //         isShowing: false
    //     })
    // }

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

    // showModal = () => {
    //  const modal = document.querySelector('.modal')
    //  console.log(modal)
    //  modal.style.visibility = 'hidden'
    // }

    render() {
        return (
            <div>
                <div>
                    <h4 header={'Want to See'}>Movies You Want To See:
                        <div className="profile--movies">
                            {this.state.movies.map((element, i) => (
                                <div key={i}>
                                <MovieThumb
                                    key={i}
                                    clickable={true}
                                    image={element.picture ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.picture}` : './images/no_image.jpg'}
                                    movieId={element.id}
                                    movieName={element.original_title}
                                />

                                <button onClick={() => {if(window.confirm('Delete the item?')){this.deleteMovie(element.uid)}}}>Delete</button>
                                {/* { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null } */}
                                {/* <button className="open-modal-btn" onClick={() => {this.deleteMovie(element.uid); this.openModalHandler()}}>Delete</button> */}
                                <button className="open-modal-btn" onClick={() => {this.deleteMovie(element.uid)}}>Delete</button>
                                <Modal
                                    className="modal"
                                    show={this.state.isShowing}
                                    close={this.closeModalHandler}
                                    >
                                </Modal>
                                {/* <button onClick={() => this.showModal()}></button> */}
                                </div>
                            ))}

                            <div>
                            {this.state.friends.map((f, i) => (
                                <div>
                                    <Link to={`/profile/${f.uid}`}>{f.username}</Link>
                                </div>
                            ))}

                            </div>
                        </div>
                    </h4>
                </div>

            </div>
        )
    }
}

export default withRouter(UserProfile)