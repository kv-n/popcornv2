import React, { Component } from 'react'
import { doGetAllUsers, doAddFriend } from '../../Firebase/Users'
import { withRouter } from 'react-router-dom'
import ProfileCard from '../ProfileCard/ProfileCard'

import './AllUsers.css'


class AllUsers extends Component {
    state = {
        users: [],
        isShowing: false
    }


    componentDidMount = () => {
        //withRouter higherlevel component getting match is getting id in the path in app.router
        doGetAllUsers()
            .then(res => this.setState({ users: res.docs.map(d => Object.assign(d.data(), { uid: d.id })) }))
    }

    toFriendsList = (friendId, friendName) => {
        doAddFriend(this.props.currentUser.id, { id: friendId, username: friendName })
    }

    render() {
        return (
            <div className="main-container">
                <div>
                    <h1>Find a Friend</h1>
                </div>
                <div className="user--container">
                    {this.state.users.map((user, i) => {
                        //goes through the map and if the ternary is true it returns null and doesnt show the current user
                        return this.props.currentUser.id !== user.uid ? 
                        (<div key={i}>
                            <ProfileCard toFriendsList={this.toFriendsList} friend={user} currentUser={this.props.currentUser} />
                        </div>)
                        :
                        null 
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(AllUsers)