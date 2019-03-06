import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import LogOut from '../../LogOut/LogOut'
import './Nav.css'






class Nav extends Component {
    render() {
        console.log(this.props.currentUser)
        return (
            <div className="nav-container">
                {/* <Link to='/'><img className="logo-nav" src="https://i.imgur.com/sWeO4J0.png" alt="shoes"/></Link> */}
                <ul className="nav-flex">
                    {/* <li id="list1" className="nav-list"><Link to='/shoes'>//Kicks</Link></li>
                <li id="list2" className="nav-list"><Link to='/profile'>//Add To Collection</Link></li> */}
                    {
                        this.props.currentUser.username
                            ? (
                                <div className="ternary-nav">
                                    <li id="list1" className="nav-list"><Link to='/'>Movies</Link></li>
                                    <li id="list2" className="nav-list"><Link to='/calendar'>My Calendar</Link></li>
                                    <li onClick={() => this.props.doLogOut()} id="list3" className="nav-list">Logout</li>
                                </div>
                            )
                            :
                            (
                                <div className="ternary-nav">
                                    <li id="list1" className="nav-list"><Link to='/'>Movies</Link></li>
                                    <li id="list3" className="nav-list"><Link to='/login'>Login</Link></li>
                                    <li id="list4" className="nav-list"><Link to='/register'>Register</Link></li>
                                </div>
                            )

                    }
                </ul>
            </div>
        )
    }
}

export default Nav