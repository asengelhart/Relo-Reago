import React from 'react';
import {Row, Col, Button, Icon} from 'react-materialize';
import {Link} from 'react-router-dom';

const VoteRow = (props) => {
  return (
    <Row>
      <Col s={6}>
        <p>Submitted by / Submetita de <Link to={`/users/${props.user.id}`}>{props.description.user.name}</Link></p>
      </Col>
      <Col s={2}>
        <Button onClick={props.handleUpvote} className={props.upvoteColor}><Icon>thumb_up</Icon></Button>
      </Col>
      <Col s={2}>
        {props.description.votes}
      </Col>
      <Col s={2}>
        <Button conClick={props.handleDownvote} className={props.downvoteColor}><Icon>thumb_down</Icon></Button>
      </Col>
    </Row>
  )
}

export default VoteRow;