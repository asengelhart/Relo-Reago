import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, Table} from 'react-materialize';

const TranslationCard = ({translation}) => {
  const cardActions = [<Link key={translation.id} to={`/translation/${translation.id}`}>See More</Link>];
  if(translation.user) {
    cardActions.push(<span>User/Uzanto: <Link key={`${translation.id}-user`} to={`/user/${translation.user.id}`}>{translation.user.name}</Link></span>)
  }

  return (
    <Row>
      <Col m={8} s={12}>
        <Table>
          <thead>
            <tr>
              <th>English</th>
              <th>Esperanto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{translation.en}</td>
              <td>{translation.eo}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default TranslationCard;