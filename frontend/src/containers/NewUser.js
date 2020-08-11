import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-materialize';
import {createUser} from '../actions/users';
import {Redirect} from 'react-router-dom';
import UserForm from '../components/UserForm';

class NewUser extends Component {
  state = {
    userCreated: false
  }

  redirectWhenCreated = () => {
    if(this.state.userCreated) {
      return <Redirect to='/' />
    }
  }

  handleSubmit = (user) => {
    this.props.createUser(user)
    .then(isLoggedIn => {
      if(isLoggedIn) {
        this.setState({userCreated: true});
      }
    });
  }

  render() {
    return (
      <div>
        {this.redirectWhenCreated()}
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
  return {createUser: user => dispatch(createUser(user))};
}

export default connect(null, mapDispatchToProps)(NewUser);