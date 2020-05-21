import React, {Component} from 'react';
import {connect} from 'react-redux';
import TranslationCard from '../components/TranslationCard';
import DescriptionCard from '../components/DescriptionCard';
import DescriptionForm from '../components/DescriptionForm';
import VoteRow from '../components/VoteRow';
import {fetchOneTranslation, changeTranslationVotes} from '../actions/translations';
import {changeDescriptionVotes} from '../actions/descriptions';

class TranslationPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match);
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
    .then(translation => {
      if(translation) {
        let descriptions;
        if(translation.descriptions && translation.descriptions.length > 0) {
          descriptions = [...translation.descriptions];
        } else {
          descriptions = [];
        }
        this.setState({
          ...this.state,
          translation,
          descriptions
        });
      }
    });
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   //Since I had problems updating the state after calling fetchTranslation in compnentDidMount
  //   let translation = nextProps.translations.find(item => item.id.toString() === nextProps.match.params.id);
  //   debugger;
  //   if(translation) {
  //     let descriptions = translation.descriptions ? translation.descriptions : [];
  //     return {
  //       ...prevState,
  //       translation,
  //       descriptions
  //     }
  //   } else {
  //     return prevState;
  //   }
  // }
  

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
    const upvotedIdx = this.state.upvotedDescriptions.findIndex(item => item.id === description.id);
    const downvotedIdx = this.state.downvotedDescriptions.findIndex(item => item.id === description.id);
    debugger;
    if(voteChange > 0 && downvotedIdx === -1) {
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
    } else if(voteChange < 0 && upvotedIdx === -1) {
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

    this.props.changeDescriptionVotes(description, newVoteChange)
    .then(description => {
      let idx = this.state.descriptions.findIndex(item => item.id === description.id);
      this.setState({
        ...this.state,
        descriptions: [
          ...this.state.descriptions.slice(0, idx),
          description,
          ...this.state.descriptions.slice(idx + 1)
        ]

      })
    });
  }

  renderDescriptions = () => {
    if(this.state.descriptions && this.state.descriptions.length > 0) {
      return this.state.descriptions.map(item => {
        return (
          <DescriptionCard 
            description={item}
            handleUpvote={() => {this.handleDescriptionVote(item.id, 1)}}
            handleDownvote={() => {this.handleDescriptionVote(item.id, -1)}}
            upvoteColor={this.voteColors(this.state.upvotedDescriptions.find(desc => desc.id === item.id))}
            downvoteColor={this.voteColors(this.state.downvotedDescriptions.find(desc => desc.id === item.id))}
          />
        )
      });
    }
  }

  renderDescriptionForm = () => {
    if(this.props.user) {
      console.log(this.props.user);
    } else {
      console.log("No user in state");
    }
    if(this.state.translation && this.props.user){
      return <DescriptionForm translation={this.state.translation} user={this.props.user} />;
    }
  }

  renderTranslationVoteRow = () => {
    if(this.state.translation && this.state.translation.user) {
      return (
        <VoteRow 
          user={this.state.translation.user}
          handleUpvote={() => {this.handleTranslationVote(1)}}
          handleDownvote={() => {this.handleTranslationVote(-1)}}
          upvoteColor={(() => this.voteColors(this.state.translationUpvoted))()}
          downvoteColor={(() => this.voteColors(this.state.translationDownvoted))()}
        />
      )
    }
  }

  render() {
    console.log(this.props.user);
    if(this.props.loading) {
      return <p>Elŝutanta...</p>
    } else {
      return (
        <div>
        <TranslationCard translation={this.state.translation} />
        {this.renderTranslationVoteRow()}
        {this.renderDescriptionForm()}
        {this.renderDescriptions()}
        </div>
      )
    }
  }  
}

const mapStateToProps = state => {
  return {
    translations: state.translations.translations,
    descriptions: state.descriptions.descriptions,
    user: state.user.currentUser,
    loading: state.translations.loading
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