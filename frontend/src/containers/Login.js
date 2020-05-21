import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-materialize';
import {login} from '../actions/users';
import {Redirect} from 'react-router-dom';
import UserForm from '../components/UserForm';

class Login extends Component {
  state = {
    loggedIn: this.props.loggedIn
  }

  handleSubmit = (user) => {
    this.props.login(user)
    .then(isLoggedIn => {
      console.log(isLoggedIn);
      debugger;
      if(isLoggedIn) {
        this.setState({loggedIn: true})
      }
    })
  }

  redirectIfLoggedIn = () => {
    if(this.state.loggedIn) {
      return <Redirect to='/' />
    }
  }

  render() {
    console.log(this.props.currentUser)
    return (
      <div>
        {this.redirectIfLoggedIn()}
        <Row>
          <Col s={12}>
            <h2>Login / Ensaluti</h2>
          </Col>
        </Row>
        <UserForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

//remove
const mapStateToProps = state => {
  return {loggedIn: !!state.user.currentUser}
}

const mapDispatchToProps = dispatch => {
  return {login: user => dispatch(login(user))};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);