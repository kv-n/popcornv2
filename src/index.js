import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Login from './Auth/Login'
import Register from './Auth/Register'
import {auth} from './Firebase/Firebase'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import { doGetUser } from './Firebase/Users'
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Movie from './Components/Movie/Movie';

import "semantic-ui-css/semantic.min.css";
import Navigation from './Components/Nav/Nav';

class Root extends Component {
  state = {
    currentUser: {}
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser => 
      authUser &&
        doGetUser(authUser.uid)
          .then(currentUser => this.setState({currentUser: currentUser.data()}))
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
        <Navigation doSetCurrentUser={(user) => this.setState({currentUser: user})}/>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Home doLogOut={this.doLogout}/>}/>
          <Route path="/:movieId" component={Movie} exact />
          <Route path="/login" component={() => <Login doSetCurrentUser={(user) => this.setState({currentUser: user})}/>}/>
          <Route path="/register" component={Register} />       
        </Switch>
        </Router>
        </div>
    );

  }
}


const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Router>
    <RootWithAuth />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
