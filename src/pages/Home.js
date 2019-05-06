import React from 'react';
import { Container, Jumbotron /* , Button */ } from 'reactstrap';

function createMarkup() {
  return { __html: '<iframe src="http://212.247.123.218:8081/webb_mobil/" width="540" height="450"></iframe>' };
}

function Home() {
  return (
    <div className="page">
      <Container>
        <Jumbotron>
          <h1>Välkommen till TeleOffice Projekt</h1>
          <p className="lead">
            Denna sida är kopplad till osTicket. För att komma åt ditt innehåll måste du därför först logga in i
            osTicket.
          </p>
          <a
            href={process.env.REACT_APP_PATH_LOGIN}
            className="btn btn-success"
            target="_blank"
            rel="noopener noreferrer"
          >
            Logga in
          </a>
        </Jumbotron>
        <div dangerouslySetInnerHTML={createMarkup()} />;
      </Container>
    </div>
  );
}

export default Home;
