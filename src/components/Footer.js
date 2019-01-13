import React from 'react';
import { Container } from 'reactstrap';

function Footer() {
  return (
    <footer>
      <Container fluid>
        <span className="text-muted">Version {process.env.REACT_APP_VERSION}</span>
        <span className="text-muted float-right">Budget, 2019 RopaOlle.se</span>
      </Container>
    </footer>
  );
}

export default Footer;
