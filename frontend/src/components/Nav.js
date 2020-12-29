import React from 'react';


 function  Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/users">Users</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/groups">Groups</a>
            </li>
          </ul>
      </nav>
    )
}

export default Navbar;