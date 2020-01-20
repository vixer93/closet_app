import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a>Sass</a></li>
              <li><a>Display</a></li>
              <li><a>Training</a></li>
            </ul>
          </div>
        </nav>
      </header>
      );
  }
}

export default Header;
