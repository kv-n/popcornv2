import React, {Component} from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import './ProfileCard.css'

class ProfileCard extends Component {

  handleClick = () => {
    const { uid, username } = this.props.friend
    this.props.toFriendsList(uid, username)
  }

  render(){
    const { username } = this.props.friend
    return(
      <div className='profile--card'>
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' />
        <Card.Header>{username}</Card.Header>
        {/* <Card.Meta></Card.Meta> */}
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
