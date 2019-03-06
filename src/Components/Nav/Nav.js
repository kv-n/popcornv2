import React from 'react';
import { Link } from 'react-router-dom'
// import LogOut from '../../LogOut/LogOut'
import './Nav.css'




const Navigation = (props) => {
    console.log(props.currentUser)
    return(
        <div className="nav-container">
        {/* <Link to='/'><img className="logo-nav" src="https://i.imgur.com/sWeO4J0.png" alt="shoes"/></Link> */}
            <ul className="nav-flex">
                {/* <li id="list1" className="nav-list"><Link to='/shoes'>//Kicks</Link></li>
                <li id="list2" className="nav-list"><Link to='/profile'>//Add To Collection</Link></li> */}
                {
                    props.currentUser
                        ?(
                            <div className="ternary-nav">
                                <li id="list1" className="nav-list"><Link to='/'>Movies</Link></li>
                                <li id="list2" className="nav-list"><Link to='/profile'>User Profile</Link></li>
                                <li id="list3" className="nav-list">LOGOUT</li>
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

export default Navigation