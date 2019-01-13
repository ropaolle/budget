import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Img404 from '../images/404.png';

function Page404() {
  return (
    <div className="page page404">
      <Container fluid>
        <Row>
          <Col md={6} className="text-center">
            <h1 className="display-2">Woops 404!</h1>
            <div className="mt-4 mb-4">Sidan du söker saknas tyvärr...</div>
            <div className="mb-2">Kan det vara någon av följande sidor?</div>
            <div>
              <Link to="fakturering">Fakturering</Link>
            </div>
            <div>
              <Link to="projekt">Projekt</Link>
            </div>
            <div>
              <Link to="tider">Mina tider</Link>
            </div>
            <div>
              <Link to="wallboard">Wallboard</Link>
            </div>
          </Col>
          <Col md={6} className="text-center">
            <img src={Img404} alt="404" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Page404;
