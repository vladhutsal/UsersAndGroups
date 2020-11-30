import React from 'react';


export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/users">Users</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/groups">Groups</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}