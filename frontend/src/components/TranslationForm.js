import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col, TextInput, Button} from 'react-materialize';
import {postTranslation} from '../actions/translations';

class TranslationForm extends Component {
  state = {
    en: "",
    eo: "",
    user_id: this.props.user.id
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitTranslation(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <Col s={6}>
            <TextInput
              name="en"
              id="en"
              onChange={this.handleChange}
              label="English"
            />
          </Col>
          <Col s={6}>
            <TextInput 
              name="eo"
              id="eo"
              onChange={this.handleChange}
              label="Esperanto"
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

const mapStateToProps = state => {
  return {user: state.user.current_user}
}

const mapDispatchToProps = dispatch => {
  return {submitTranslation: translation => {dispatch(postTranslation(translation))}}
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslationForm);