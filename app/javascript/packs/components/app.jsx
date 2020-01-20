import React, { Component, PropTypes } from 'react';
import Header from './header'
import Closet from './closet'
import Outfit from './Outfit'
import Recommend from './recommend'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Closet/>
        <Outfit/>
        <Recommend/>
      </div>
      );
  }
}

export default App;
