import React, { Component } from 'react';
import Login from './Auth/Login'
import Register from './Auth/Register'
import { auth } from './Firebase/Firebase'
import { Switch, Route, withRouter } from 'react-router-dom'


import { doGetUser } from './Firebase/Users'
import Home from './Components/Home/Home';
import Movie from './Components/Movie/Movie';

import "semantic-ui-css/semantic.min.css";
import Nav from './Components/Nav/Nav';
import Calendar from './Components/Calendar/Calendar'
import UserProfile from './Components/UserProfile/UserProfile'
import AllUsers from './Components/AllUsers/AllUsers'

class App extends Component {
  state = {
    currentUser: {}
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser =>
      authUser &&
      doGetUser(authUser.uid)
        .then(currentUser => this.setState({ currentUser: Object.assign(currentUser.data(), {id: currentUser.id})}))
    )
  }

  doLogOut = () => {
    auth.signOut()
    this.setState({
      currentUser: {}
    })
    this.props.history.push('/movies')
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div>
        <Nav
          doSetCurrentUser={(user) => this.setState({ currentUser: user })}
          currentUser={this.state.currentUser}
          doLogOut={this.doLogOut}
        />
        <Switch>
          <Route exact path="/movies" component={() => <Home doLogOut={this.doLogout} />} />
          <Route path="/login" component={() => <Login doSetCurrentUser={(user) => this.setState({ currentUser: user })} />} />
          <Route path='/register' component={() => <Register/>} />
          <Route path='/calendar' component={()=> <Calendar/>} />
          <Route path='/profile/:id' component={() => <UserProfile currentUser={this.state.currentUser}/>}/>
          <Route path="/movies/:movieId" component={() => <Movie currentUser={this.state.currentUser}/>} exact />
          <Route path="/all-users" component={() => <AllUsers currentUser={this.state.currentUser}/>} exact />
        </Switch>
      </div>
    );

  }
}

export default withRouter(App);
