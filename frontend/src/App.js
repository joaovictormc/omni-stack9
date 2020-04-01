import React from 'react';
import './App.css';
import logoImg from './assets/logo.svg';
import Routes from './routes';

function App() {
  return (
    <div className="container">
      <img src={logoImg} alt="AirCnC" />
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
