import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import GroupsAndUsers from './App';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GroupsAndUsers />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

