import React, { Component, PropTypes } from 'react';
import Header from './header'
import Closet from './closet'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Closet/>
      </div>
      );
  }
}

export default App;
