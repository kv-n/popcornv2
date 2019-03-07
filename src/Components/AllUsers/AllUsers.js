import React, { Component } from 'react'
import { doGetAllUsers, doAddFriend } from '../../Firebase/Users'
import { withRouter } from 'react-router-dom'


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
        doAddFriend( this.props.currentUser.id,{id: friendId, username: friendName})
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
                </div>
                <h1>Find a Friend</h1>
                {this.state.users.map((user, i) => (
                                <div>
                                <button onClick={() => this.toFriendsList(user.uid, user.username)}>{user.username}</button>
                                </div>
                            ))}
            </div>
        )
    }
}

export default withRouter(AllUsers)