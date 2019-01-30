import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button } from 'reactstrap';
import jwt from 'jsonwebtoken';
import { TextField, PasswordField } from '../dialogs/fields';
import { apiPost } from '../lib/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '', email: '' };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange({ value, field }) {
    this.setState({ [field]: value });
  }

  handleLogin() {
    // const { email, password } = this.state;
    const email = 'ropaolle@gmail.com';
    const password = 'pass1234';
    const { login } = this.props;
    apiPost('/login', { password, email }).then(({ data }) => {
      login(jwt.decode(data));
      localStorage.setItem('token', data);
    });
  }

  render() {
    const { email, password } = this.state;
    const token = localStorage.getItem('token');
    return token ? (
      <Redirect to="/" />
    ) : (
      <div className="page login">
        <Container fluid>
          <h2>Logga in</h2>
          <Form>
            <TextField id="email" label="Användarnamn/E-post" value={email} onChange={this.handleFieldChange} />
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
