import React, {Component} from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import './FriendsCard.css'
import { Link, withRouter } from 'react-router-dom'
import Modal from '../Modal/Modal'

class ProfileCard extends Component {

  handleClick = () => {
    const { uid, username } = this.props.friend
    this.props.deleteFriend(uid, username)
  }

  render(){
    const { username } = this.props.friend

    console.log(this.props)
    return(
      <div className='profile--card'>
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' />
        <Card.Header><Link to={`/profile/${this.props.friend.id}`}>{username}</Link> </Card.Header>
        {/* <Card.Meta></Card.Meta> */}
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
            {/* <Button onClick={this.handleClick} basic color='green'> */}
                <Modal isUser={this.props.isUser} deleteFriend={this.props.deleteFriend} friendId={this.props.friendId}/>
            {/* </Button> */}
            </div>
        </Card.Content>
      )
      :
      (
        <div/>
      )
      }
    </Card>
    </div>
    )
  }
}

export default withRouter(ProfileCard)
