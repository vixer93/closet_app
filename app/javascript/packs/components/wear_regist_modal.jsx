import React, { Component, PropTypes } from 'react';

class WearRegistModal extends Component {

  render() {
    return (
      <div className="wear-regist-modal">
        <div className="wear-regist-modal__contents">
          <button onClick={()=>{this.props.closeModal();}} className="close-btn">
          </button>
          <div className="selected-img">
          </div>
          <form className="input-wear-info">
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file"/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
              </div>
            </div>
            <div className="input-field col s6">
              <input id="brand" type="text" className="validate"/>
              <label className="active" htmlFor="brand">Brand</label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default WearRegistModal;
