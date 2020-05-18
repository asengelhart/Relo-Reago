import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-materialize';
import {login} from '../actions/users';
import UserForm from '../components/UserForm';

class Login extends Component {
  handleSubmit = (user) => {
    this.props.login(user);
  }

  render() {
    return (
      <div>
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

const mapDispatchToProps = dispatch => {
  return {login: user => {dispatch(login(user))}};
}

export default connect(null, mapDispatchToProps)(Login);