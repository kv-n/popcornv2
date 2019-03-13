import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ModalExampleControlled extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    if (this.props.movieId) {
      this.props.deleteMovie(this.props.movieId)
    } else if (this.props.friendId) {
      this.props.deleteFriend(this.props.friendId)
    }
    this.setState({ modalOpen: false })
  }

  modalHandler = () => {
    this.setState({
      modalOpen: false
    })
  }

  render() {
    return (
      <Modal
        trigger={<Button inverted className={this.props.isUser ? 'show' : 'hide'} inverted color='red' onClick={this.handleOpen}>Delete</Button>}
        open={this.state.modalOpen}
        onClose={this.modalHandler}
        close={!this.state.ModalOpen}
        basic
        size='small'
      >
        <Header icon='browser' content='Popcorn' />
        <Modal.Content>
          {this.props.movieId
            ? (
              <h3>Delete This Movie From Your Must Watch List?</h3>
            )
            : (
              <h3>What?! Why?! Did they do something wrong?</h3>
            )

          }

        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose} inverted color='green' >
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
