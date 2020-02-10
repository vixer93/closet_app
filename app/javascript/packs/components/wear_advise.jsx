import React, { Component, PropTypes } from 'react';

class WearAdvise extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="wear-advise">
          <div className="notifications">
            <i className="material-icons notif-icon">lightbulb_outline</i>
            <p>{this.props.message}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WearAdvise;