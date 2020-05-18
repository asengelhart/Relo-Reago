import React, {Component} from 'react';
import {connect} from 'react-redux';
import TranslationCard from '../components/TranslationCard';
import DescriptionCard from '../components/DescriptionCard';
import VoteRow from '../components/VoteRow';
import {fetchOneTranslation, changeTranslationVotes} from '../actions/translations';
import {changeDescriptionVotes} from '../actions/descriptions';

class TranslationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translation: null,
      descriptions: [],
      translationUpvoted: false,
      translationDownvoted: false,
      upvotedDescriptions: [],
      downvotedDescriptions: []
    }
  }

  componentDidMount() {
    this.props.fetchTranslation(this.props.match.params.id)
    let translation = this.props.translations.find(item => item.id === this.props.translationId)
    this.setState({
      ...this.state,
      translation: translation,
      descriptions: [...translation.descriptions]
    });
  }

  voteColors = (isOn) => {
    const color = isOn ? "teal" : "grey";
    return color;
  }

  handleTranslationVote = (voteChange) => {
    let newVoteChange = 0;
    if(voteChange > 0 && !this.state.translationDownvoted) {
      if(!this.state.translationUpvoted) {
        newVoteChange = 1;
        this.setState({...this.state, translationUpvoted: true})
      } else {
        newVoteChange = -1;
        this.setState({...this.state, translationUpvoted: false})
      } 
    } else if(voteChange < 0 && !this.state.translationUpvoted) {
      if(!this.state.translationDownvoted) {
        newVoteChange = -1;
        this.setState({...this.state, translationDownvoted: true})
      } else {
        newVoteChange = 1;
        this.setState({...this.state, translationDownvoted: false})
      }
    }
    this.props.changeTranslationVotes(this.state.translation, newVoteChange);
  }

  handleDescriptionVote = (descriptionId, voteChange) => {
    const description = this.state.descriptions.find(desc => desc.id = descriptionId);
    let newVoteChange = 0;
    const upvotedIdx = this.state.upvotedDescriptions.findIndex(item => item === description);
    const downvotedIdx = this.state.downvotedDescriptions.findIndex(item => item === description);
    if(voteChange > 0 && downvotedIdx !== -1) {
      if(upvotedIdx === -1) {
        newVoteChange = 1;
        this.setState({
          ...this.state,
          upvotedDescriptions: [...this.state.upvotedDescriptions, description]
        });
      } else {
        newVoteChange = -1;
        this.setState({
          ...this.state,
          upvotedDescriptions: [
            ...this.state.upvotedDescriptions.slice(0, upvotedIdx), 
            ...this.state.upvotedDescriptions.slice(upvotedIdx+1)
          ]
        })
      }
    } else if(voteChange < 0 && upvotedIdx !== -1) {
      if(downvotedIdx === -1) {
        newVoteChange = -1;
        this.setState({
          ...this.state,
          downvotedDescriptions: [...this.state.downvotedDescriptions, description]
        });
      } else {
        newVoteChange = 1;
        this.setState({
          ...this.state,
          downvotedDescriptions: [
            ...this.state.downvotedDescriptions.slice(0, downvotedIdx),
            ...this.state.downvotedDescriptions(downvotedIdx + 1)
          ]
        });
      }
    }

    this.changeDescriptionVotes(description, newVoteChange);
  }

  renderDescriptions = () => {
    if(this.descriptions && this.descriptions.length > 0) {
      return this.descriptions.map(item => {
        return (
          <DescriptionCard 
            description={item}
            handleUpvote={() => {this.handleDescriptionVote(item.id, 1)}}
            handleDownvote={() => {this.handleDescriptionVote(item.id, -1)}}
            upvoteColor={() => this.voteColors(this.state.upvotedDescriptions.find(desc => desc === item))}
            downvoteColor={() => this.voteColors(this.state.downvotedDescriptions.find(desc => desc === item))}
          />
        )
      });
    }
  }

  renderTranslationVoteRow = () => {
    if(this.state.user) {
      return (
        <VoteRow 
          user={this.state.user}
          handleUpvote={() => {this.handleTranslationVote(1)}}
          handleDownvote={() => {this.handleTranslationVote(-1)}}
          upvoteColor={() => this.voteColors(this.state.translationUpvoted)}
          downvoteColor={() => this.voteColors(this.state.translationDownvoted)}
        />
      )
    }
  }

  render() {
    return (
      <div>
        <TranslationCard translation={this.translation} />
        {this.renderTranslationVoteRow()}
        {this.renderDescriptions()}
      </div>
    )
  }  
}

const mapStateToProps = state => {
  return {
    translations: state.translations,
    descriptions: state.descriptions
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchTranslation: id => dispatch(fetchOneTranslation(id)),
    changeTranslationVotes: (translation, voteChange) => dispatch(changeTranslationVotes(translation, voteChange)),
    changeDescriptionVotes: (description, voteChange) => dispatch(changeDescriptionVotes(description, voteChange))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslationPage)