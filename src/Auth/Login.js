import React, { Component } from "react";
import { auth } from '../Firebase/Firebase'
import { doGetUser } from '../Firebase/Users'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import './Login.css'

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          doGetUser(signedInUser.user.uid)
            .then(snapShot => {
              this.props.doSetCurrentUser(snapShot.data())
              this.props.history.push('/movies')
            })
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div className="login-container">
        <Grid textAlign="center" verticalAlign="middle" className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" icon color="violet" textAlign="center">
              <Icon name="tv" color="violet" />
              Login to Popcorn
          </Header>
            <Form onSubmit={this.handleSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  value={email}
                  className={this.handleInputError(errors, "email")}
                  type="email"
                />

                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                  className={this.handleInputError(errors, "password")}
                  type="password"
                />

                <Button
                  disabled={loading}
                  className={loading ? "loading" : ""}
                  color="violet"
                  fluid
                  size="large"
                >
                  Submit
              </Button>
              </Segment>
            </Form>
            {errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
            )}
            <Message>
              Don't have an account? <Link to="/register">Register</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Login);

