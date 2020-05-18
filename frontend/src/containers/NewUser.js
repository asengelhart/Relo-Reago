import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-materialize';
import {createUser} from '../actions/users';
import UserForm from '../components/UserForm';

class NewUser extends Component {
  handleSubmit = (user) => {
    this.props.createUser(user);
  }

  render() {
    return (
      <div>
        <Row>
          <Col s={12}>
            <h2>Enter new username and password / Enmetu novan salutnomon kaj pasvorton</h2>
          </Col>
        </Row>
        <UserForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {login: user => {dispatch(createUser(user))}};
}

export default connect(null, mapDispatchToProps)(NewUser);