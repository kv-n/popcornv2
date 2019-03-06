import React, { Component } from 'react';
import Login from './Auth/Login'
import Register from './Auth/Register'
import { auth } from './Firebase/Firebase'
import { Switch, Route } from 'react-router-dom'


import { doGetUser } from './Firebase/Users'
import Home from './Components/Home/Home';
import Movie from './Components/Movie/Movie';

import "semantic-ui-css/semantic.min.css";
import Navigation from './Components/Nav/Nav';
import Calendar from './Components/Calendar/Calendar'

class App extends Component {
  state = {
    currentUser: {}
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser =>
      authUser &&
      doGetUser(authUser.uid)
        .then(currentUser => this.setState({ currentUser: currentUser.data() }))
    )
  }

  doLogOut() {
    auth.signOut()
    this.setState({
      currentUser: {}
    })
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div>
        <Navigation
          doSetCurrentUser={(user) => this.setState({ currentUser: user })}
        />
        <Switch>
          <Route exact path="/" component={() => <Home doLogOut={this.doLogout} />} />
          <Route path="/login" component={() => <Login doSetCurrentUser={(user) => this.setState({ currentUser: user })} />} />
          <Route path='/register' component={() => <Register/>} />
          <Route path='/calendar' component={()=> <Calendar/>} />
          <Route path="/:movieId" component={Movie} exact />
        </Switch>
      </div>
    );

  }
}

export default App;
