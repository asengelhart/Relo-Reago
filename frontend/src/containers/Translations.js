import React, { Component } from 'react';
import TranslationCard from '../components/TranslationCard'
import {connect} from 'react-redux';

class Translations extends Component {
  renderTranslations = () => {
    this.props.translations.map((translation) => {
      return <TranslationCard key={translation.id} translation={translation} />
    });
  }

  render() {
    return (
      <div>
        {this.renderTranslations()}
      </div>
    )
  }
}

export default Translations;