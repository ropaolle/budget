import React, { Component } from 'react';
import { Container, Form, Button } from 'reactstrap';
import { TextField, PasswordField } from '../dialogs/fields';
import { apiPost } from '../lib/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '', username: '' };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  async componentDidMount() {
    // const { data } = await apiGet('/test');
    // console.log('Test', data);
    // this.setState({ ...data });
  }

  handleFieldChange({ value, field }) {
    this.setState({ [field]: value });
  }

  async handleLogin() {
    const { username, password } = this.state;
    console.log('Login', username, password);
    const data = await apiPost('/login2', { password, username });
    console.log('Login', data);
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="page login">
        <Container fluid>
          <h2>Logga in</h2>
          <Form>
            <TextField id="username" label="Användarnamn/E-post" value={username} onChange={this.handleFieldChange} />
            <PasswordField id="password" label="Lösenord" value={password} onChange={this.handleFieldChange} />
            <div className="text-right">
              <Button color="primary" onClick={this.handleLogin}>
                Logga in
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
