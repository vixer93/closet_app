import React, { Component, PropTypes } from 'react';

class WearCard extends Component {

  render() {
    return (
      <div className="card wear-card">
        <div className="card__image">
          <img src={this.props.img}/>
        </div>
        <div className="card__content">
          <ul>
            <li>Type:{this.props.type}</li>
            <li>brand:{this.props.brand}</li>
            <li>color:{this.props.color}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default WearCard;
