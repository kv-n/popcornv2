import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render () {
        const { activeItem } = this.state
        return (
              <div className='nav-container'>
    <ul className='nav-flex'>
      {
        this.props.currentUser.username
          ? (
            <div className='ternary-nav'>
              <li id='list1' className='nav-list'><Link to='/movies'>Movies</Link></li>
              <li id='list2' className='nav-list'><Link to='/calendar'>My Calendar</Link></li>
              <li id='list2' className='nav-list'><Link to={`/profile/${this.props.currentUser.id}`}>My Profile</Link></li>
              <li id='list3' className='nav-list'><Link to='/all-users'>Find a Friend</Link></li>
              <li onClick={() => this.props.doLogOut()} id='list3' className='nav-list'>Logout</li>
            </div>
          )
          : (
            <div className='ternary-nav'>
              <li id='list1' className='nav-list'><Link to='/movies'>Movies</Link></li>
              <li id='list3' className='nav-list'><Link to='/login'>Login</Link></li>
              <li id='list4' className='nav-list'><Link to='/register'>Register</Link></li>
            </div>
          )
      }
    </ul>
  </div>
        //     <Menu inverted>
        //         <Menu.Item 
        //             name='home' 
        //             active={activeItem === 'home'} 
        //             onClick={this.handleItemClick} />
        //         <Menu.Item
        //             name='messages'
        //             active={activeItem === 'messages'}
        //             onClick={this.handleItemClick}
        //         />
        //         <Menu.Item
        //             name='friends'
        //             active={activeItem === 'friends'}
        //             onClick={this.handleItemClick}
        //             link={true}
        //         ><Link to='/movies'>Movies</Link></Menu.Item>
        //   </Menu>
        )
    }
}


export default Nav
