import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import TranslationSearch from '../components/TranslationSearch'
import Translations from './Translations';
import TranslationPage from './TranslationPage';
import {connect} from 'react-redux';

class TranslationContainer extends Component {
  render() {
    return (
      <div>
        <TranslationSearch />
        <Translations translations={this.props.translations} />
        <Route path='/translations/:id' 
                 render={routerProps => {
                 return (
                  <TranslationPage {...routerProps} 
                    translation={routerProps.id} 
                  />)} 
                }
          />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {translations: state.translations.translations}
}

export default connect(mapStateToProps)(TranslationContainer);