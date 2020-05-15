import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Select, TextInput, Button} from 'react-materialize';
import { fetchTranslations } from '../actions/translations';

class TranslationSearch extends Component {
  state = {
    lang: '',
    word: ''
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.lang === ''){
      alert(`Please select a language. / Bonvolu elekti lingvon.`);
    } else if(this.state.word === '') {
      alert(`Please input a word to search. / Bonvolu enigi vorton por serĉi`)
    } else {
      this.props.queryTranslation(this.state);
    }
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <Select
          name="lang"
          id="lang"
          onChange={this.handleChange}
          >
          <option disabled value="">
            Language/Lingvo
          </option>
          <option value="en">
            English/Angla
          </option>
          <option value="eo">
            Esperanto
          </option>
        </Select>
        <TextInput
          name="word"
          id="word"
          onChange={this.handleChange}
          placeholder="Search for word/Serĉi vorton"
        />
        <button className="btn" type="submit">Search/Serĉi</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return { queryTranslation: translation => dispatch(fetchTranslations(translation)) }
}

export default connect(null, mapDispatchToProps)(TranslationSearch);