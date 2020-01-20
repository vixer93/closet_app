import React, { Component, PropTypes } from 'react';
import Header from './header'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="main"></div>
      </div>
      );
  }
}

export default App;
