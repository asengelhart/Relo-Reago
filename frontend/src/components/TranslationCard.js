import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Table} from 'react-materialize';

class TranslationCard extends Component {

  renderUserIfPresent = () => {
    if(this.props.translation.user) {
      return(<span>User/Uzanto: {this.props.translation.user.name}</span>)
    }
  }

  render() {
    if(!this.props.translation) return <div />
    return (
      <Row>
        <Col s={12}>
          <Table>
            <thead>
              <tr>
                <th>English</th>
                <th>Esperanto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.translation.english}</td>
                <td>{this.props.translation.esperanto}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Row>
          <Col s={6}>
            <Link key={this.props.translation.id} to={`/translations/${this.props.translation.id}`}>See More</Link>
          </Col>
          <Col s={6}>
            {this.renderUserIfPresent()}
          </Col>
        </Row>
      </Row>
    )
  }
}

export default TranslationCard;