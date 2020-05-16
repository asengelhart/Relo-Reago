import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOneTranslation, changeTranslationVotes} from '../actions/translations'

class TranslationPage extends Component {
  constructor(props) {
    super(props);
    this.translation = null;
  }

  componentDidMount() {
    this.props.fetchTranslation(this.props.id)
    this.translation = this.props.translations.find(item => item.id === this.props.translationId);
  }

  handleTranslationVote = (event) => {
    const voteChange = event.target.value;
    changeTranslationVotes(this.translation, voteChange);
  }

  
}

const mapStateToProps = state => {
  return {
    translations: state.translations,
    descriptions: state.descriptions
  }
}
const mapDispatchToProps = dispatch => {
  return {fetchTranslation: id => dispatch(fetchOneTranslation(id))}
}

export default connect(mapStateToProps, mapDispatchToProps)(TranlationPage)