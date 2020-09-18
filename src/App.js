import React from 'react';
import './assets/styles/main.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
  return (
    <div className="App">
        <Container>
            <Row>
                <Col>1 of 1</Col>
                <Col>1 of 1</Col>
                <Col>1 of 1</Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
