import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col, Textarea, Button} from 'react-materialize';
import {postDescription} from '../actions/descriptions';

class DescriptionForm extends Component {
  state = {
    user_id: this.props.user.id,
    translation_id: this.props.translation.id,
    content: ""
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      content: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitDescription(state);
  }

  render() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col s={12}>
              <Textarea
                name="content"
                id="content"
                onChange={handleChange}
                label={"Write description here / Priskribu ĉi tie"}
              />
            </Col>
          </Row>
          <Row>
            <Col s={4}>
              <Button type="submit">Submit / Submeti</Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {user: state.user.current_user}
}

const mapDispatchToProps = (dispatch) => {
  return {submitDescription: (description) => {dispatch(postDescription(description))}}
}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionForm);

