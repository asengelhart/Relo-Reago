import React, { Component } from 'react';
import {Row, Col, TextInput, Button} from 'react-materialize';

class UserForm extends Component {
  state = {
    name: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <Col s={6}>
            <TextInput
              name="name"
              id="name"
              onChange={this.handleChange}
              label="Username / Salutnomo"
            />
          </Col>
          <Col s={6}>
            <TextInput
              name="password"
              id="password"
              onChange={this.handleChange}
              label="Password / Pasvorto"
              password
            />
          </Col>
        </Row>
        <Row>
          <Col s={4}>
            <Button type="submit">Submit / Submeti</Button>
          </Col>
        </Row>
      </form>
    )
  }
}

export default UserForm;