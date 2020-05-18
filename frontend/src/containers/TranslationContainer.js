import React, { Component } from 'react';
import TranslationSearch from '../components/TranslationSearch'
import Translations from './Translations';
import {connect} from 'react-redux';

class TranslationContainer extends Component {
  render() {
    return (
      <div className="container">
        <TranslationSearch />
        <Translations translations={this.props.translations} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {translations: state.translations}
}

export default connect(mapStateToProps)(TranslationContainer);