import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/users/edit">Setting</a></li>
              <li><a href="/users/sign_out" data-method="delete" rel="nofollow">Log Out</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
