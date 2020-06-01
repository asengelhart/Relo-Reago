import React, { Component } from 'react';
import TranslationCard from '../components/TranslationCard';

class Translations extends Component {
  renderTranslations = () => {
    if(this.props.translations && this.props.translations.length > 0) {
      console.log(this.props.translations);
      return this.props.translations.map((translation) => {
        return <TranslationCard key={translation.id} translation={translation} />
      });
    } else {
      return <p>No translations found / Tradukoj ne troviĝis</p>
    }
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