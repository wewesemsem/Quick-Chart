import React from 'react';
import './App.css';
import Home from './components/Home';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid className='App'>
      <Home />
    </Container>
  );
}

export default App;
