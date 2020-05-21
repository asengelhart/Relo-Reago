import React, { Component } from 'react';
import {Select, TextInput, Button} from 'react-materialize';

class TranslationSearch extends Component {
  render() {
    return(
      <form onSubmit={this.props.onSubmit}>
        <Select
          name="lang"
          id="lang"
          onChange={this.props.onChange}
          value=""
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
          onChange={this.props.onChange}
          placeholder="Search for word/Serĉi vorton"
        />
        <Button type="submit">Search/Serĉi</Button>
      </form>
    )
  }
}


export default TranslationSearch;