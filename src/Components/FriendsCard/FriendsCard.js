import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import './FriendsCard.css'
import { Link, withRouter } from 'react-router-dom'
import Modal from '../Modal/Modal'

class ProfileCard extends Component {

  handleClick = () => {
    const { uid, username } = this.props.friend
    this.props.deleteFriend(uid, username)
  }

  render() {
    const { username } = this.props.friend
    return (
      <div className='profile--card'>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.friend.fileRef} />
            <Card.Header><Link to={`/profile/${this.props.friend.linkToFriendId}`}>{username}</Link> </Card.Header>
            <Card.Description>
              {this.props.isUser
                ?
                (
                  <div>delete {username} from your <strong>friends list</strong></div>
                )
                :
                (
                  <div>Whatcha looking at?</div>
                )
              }
            </Card.Description>
          </Card.Content>
          {this.props.isUser
            ?
            (
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Modal isUser={this.props.isUser} deleteFriend={this.props.deleteFriend} friendId={this.props.friendId} />
                </div>
              </Card.Content>
            )
            :
            (
              <div />
            )
          }
        </Card>
      </div>
    )
  }
}

export default withRouter(ProfileCard)
