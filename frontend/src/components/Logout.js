import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {logout} from '../actions/users';
import {connect} from 'react-redux';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props.logout();
  }

  render () {
    return <Redirect to='/' />
  }
}

const mapDispatchToProps = dispatch => {
  return { logout: () => { dispatch(logout()) } }
}

export default connect(null, mapDispatchToProps)(Logout);