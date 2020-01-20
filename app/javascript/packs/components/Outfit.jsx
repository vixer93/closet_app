import React, { Component, PropTypes } from 'react';
import WearCard from './wear_card'
class Outfit extends Component {

  render() {
    return (
      <div className="outfit">
        <h4>What is Today's Outfit?</h4>
        <div className="outfit__card-list">
          <WearCard
          img= '../../../../public/fashion.jpg'
          type="Suit"
          brand="Machintosh"
          color="Grey"
          />
          <WearCard
          img= '../../../../public/fashion.jpg'
          type="Suit"
          brand="Machintosh"
          color="Grey"
          />
          <WearCard
          img= '../../../../public/fashion.jpg'
          type="Suit"
          brand="Machintosh"
          color="Grey"
          />
          <WearCard
          img= '../../../../public/fashion.jpg'
          type="Suit"
          brand="Machintosh"
          color="Grey"
          />
          <WearCard
          img= '../../../../public/fashion.jpg'
          type="Suit"
          brand="Machintosh"
          color="Grey"
          />
        </div>
      </div>
    );
  }
}

export default Outfit;
