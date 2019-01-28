import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { apiGet } from '../lib/api';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { data } = await apiGet('/test');
    console.log('Test', data);
    this.setState({ ...data });
  }

  render() {
    return (
      <div className="page test">
        <Container fluid>
          <h1>Test</h1>
        </Container>
      </div>
    );
  }
}

export default Test;
