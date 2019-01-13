import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { apiPost } from '../lib/api';

class Plugin extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };

    this.button = this.button.bind(this);
  }

  async componentDidMount() {}

  async button() {
    apiPost('/createUser', { username: 'ropaolle', password: 'pass1234', email: 'ropaolle@gmail.com' });
  }

  render() {
    return (
      <div className="page plugin">
        <Container fluid>
          <h1>Plugin</h1>
          <div>
            <Button onClick={() => this.button()}>Add user</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default Plugin;
