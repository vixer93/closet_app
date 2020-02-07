import React, { Component, PropTypes } from 'react';

class WearCard extends Component {

  render() {
    let background_color = {
      background: this.props.color,
    }
    return (
      <div className="card wear-card">
        <div className="card__image">
          <img src={this.props.img}/>
        </div>
        <div className="card__content">
          <ul>
            <li>Type:{this.props.type}</li>
            <li>brand:{this.props.brand}</li>
            <li className="wear-color">
              <p>color:</p>
              <div className="wear-color__box" style={background_color}></div>
            </li>
          </ul>
        </div>
        <WearUpdateModal/>
      </div>
    );
  }
}

export default WearCard;
