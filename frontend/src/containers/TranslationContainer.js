import React, { Component } from 'react';
import TranslationSearch from '../components/TranslationSearch'
import Translations from './Translations';
import {fetchTranslations} from '../actions/translations';
import {connect} from 'react-redux';

class TranslationContainer extends Component {
  state = {
    lang: '',
    word: '',
    submitted: null,
    exactMatch: false
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  handleCheckbox = (event) => {
    this.setState({
      ...this.state,
      exactMatch: event.target.checked
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.lang === ''){
      alert(`Please select a language. / Bonvolu elekti lingvon.`);
    } else if(this.state.word === '') {
      alert(`Please input a word to search. / Bonvolu enigi vorton por serĉi`)
    } else {
      this.props.queryTranslation({lang: this.state.lang, word: this.state.word})
      .then(() => {
        this.setState({
          ...this.state,
          submitted: this.state.word
        })
      })
    }
  }

  renderTranslationsWhenSubmitted = () => {
    if(this.state.submitted) {
      let myTranslations;
      if(this.state.exactMatch) {
        let lang;
        if(this.state.lang === "en") {
          lang = "english"; 
        } else if(this.state.lang === "eo") {
          lang = "esperanto";
        } else {
          lang = null;
        }
        myTranslations = this.props.translations.filter(entry => entry[lang] === this.state.submitted);
      } else {
        myTranslations = this.props.translations;
      }
      return <Translations translations={myTranslations} />
    }
  }

  render() {
    return (
      <div>
        <TranslationSearch onChange={this.handleChange} onSubmit={this.handleSubmit} handleCheckbox={this.handleCheckbox} />
        {this.renderTranslationsWhenSubmitted()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {translations: state.translations.translations}
}
const mapDispatchToProps = (dispatch) => {
  return { queryTranslation: translation => dispatch(fetchTranslations(translation)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslationContainer);