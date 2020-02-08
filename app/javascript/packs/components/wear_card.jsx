import React, { Component, PropTypes } from 'react';
import WearUpdateModal from './wear_update_modal'

class WearCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
    }
    this.handleClickImage = this.handleClickImage.bind(this);
    this.closeUpdateModal = this.closeUpdateModal.bind(this);
  }

  handleClickImage(){
    this.setState({isClick: true});
  }

  closeUpdateModal(){
    var value = false;
    this.setState({isClick: value});
  }

  render() {
    let update_modal;
    let background_color = {
      background: this.props.color,
    }

    if (this.state.isClick){
      update_modal = <WearUpdateModal
                      key={this.props.id}
                      closeUpdateModal={()=>{this.closeUpdateModal();}}
                      img={this.props.img}
                      type={this.props.type}
                      brand={this.props.brand}
                      color={this.props.color}
                     />
    }

    return (
      <React.Fragment>
        <div className="card wear-card" onClick={this.handleClickImage}>
          <div className="card__image">
            <img src={this.props.img}/>
          </div>
          <div className="card__content">
            <ul>
              <li>Type:{this.props.type}</li>
              <li>Brand:{this.props.brand}</li>
              <li className="wear-color">
                <p>Color:</p>
                <div className="wear-color__box" style={background_color}></div>
              </li>
            </ul>
          </div>
        </div>
        {update_modal}
      </React.Fragment>
    );
  }
}

export default WearCard;