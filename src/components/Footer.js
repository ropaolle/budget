import React from 'react';
import { Container } from 'reactstrap';
import logo from '../images/logo.png';

function Footer() {
  return (
    <footer>
      <Container fluid>
        <span className="text-muted">Version {process.env.REACT_APP_VERSION}</span>
        <span className="text-muted float-right">
          <img src={logo} width="32" alt="logo" /> TeleOffice AB
        </span>
      </Container>
    </footer>
  );
}

export default Footer;
