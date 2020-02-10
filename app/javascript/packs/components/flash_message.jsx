import React, { Component, PropTypes } from 'react';

class FlashMessage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="flash-message">
          <div className="notifications">
            <i className="material-icons notif-icon">notifications</i>
            <p>{this.props.message}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FlashMessage;
