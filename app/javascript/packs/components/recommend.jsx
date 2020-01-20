import React, { Component, PropTypes } from 'react';
import WearCard from './wear_card'

class Recommend extends Component {

  render() {
    return (
      <div className="recommend">
        <h4>Recommend Item!</h4>
        <div className="recommend__card-list">
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

export default Recommend;
