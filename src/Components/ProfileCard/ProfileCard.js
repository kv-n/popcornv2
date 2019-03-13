import React, {Component} from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import './ProfileCard.css'

class ProfileCard extends Component {

  componentDidMount() {
    if (this.props.currentUser.id === this.props.friend.uid) {
      console.log('user', this.props.currentUser.id, 'friend', this.props.friend.uid);
    }
    
  }

  handleClick = (event) => {
    const { uid, username } = this.props.friend
    this.props.toFriendsList(uid, username)
    event.target.classList.add('gray')
    event.target.classList.remove('green')
    event.target.setAttribute("disabled", "disabled")
  }

  render(){
    const { username } = this.props.friend
    return(
    <div className='profile--card'>
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='' />
        <Card.Header>{username}</Card.Header>
        <Card.Description>
          add {username} to your <strong>friends list</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button onClick={this.handleClick} basic color='green'>
            Add Friend
          </Button>
        </div>
      </Card.Content>
    </Card>
    </div>
    )
  }
}

export default ProfileCard
