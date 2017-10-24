import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="fixed-top" style={{backgroundColor: 'white'}}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <span className="navbar-brand mb-0">
              <img src="https://i.imgur.com/d1EPJRC.jpg" height="40" alt="" />
            </span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/info" className="nav-link">Info</Link>
                </li>
                <li className="nav-item">
                  <Link to="/team" className="nav-link">Team</Link>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">Login</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Nav;