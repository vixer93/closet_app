import React, { Component, PropTypes } from 'react';
import WearCard from './wear_card'

class Closet extends Component {
  render() {
    return (
      <div className="closet">
        <h4>My Closet</h4>
        <WearCard
          img= '../../../../public/fashion.jpg'
          type="Suit"
          brand="Machintosh"
          color="Grey"
        />
      </div>
      );
  }
}

export default Closet;
