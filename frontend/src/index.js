import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Groups from './Groups';
import Navbar from './components/Nav'


ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Groups />
  </React.StrictMode>,
  document.getElementById('root')
);

