import React from 'react';
import {Row, Col} from 'react-materialize';
import VoteRow from './VoteRow';

const DescriptionCard = (props) => {
  return (
    <Row>
      <Col s={12}>
        <p>{props.description.content}</p>
        <VoteRow 
          user={props.description.user}
          votes={props.description.votes}
          handleUpvote={props.handleUpvote}
          handleDownvote={props.handleDownvote}
          upvoteColor={props.upvoteColor}
          downvoteColor={props.downvoteColor}
        />
      </Col>
    </Row>
  )
}

export default DescriptionCard