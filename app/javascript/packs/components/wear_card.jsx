import React, { Component, PropTypes } from 'react';
import WearUpdateModal from './wear_update_modal';
import axios from 'axios';

class WearCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
    }
    this.handleClickImage = this.handleClickImage.bind(this);
    this.closeUpdateModal = this.closeUpdateModal.bind(this);
    this.deleteWearData   = this.deleteWearData.bind(this);

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
  }

  handleClickImage(){
    this.setState({isClick: true});
  }

  closeUpdateModal(){
    var value = false;
    this.setState({isClick: value});
  }

  deleteWearData(){
    axios.delete(`wears/${this.props.id}`)
    .then(res=>{
      this.props.addWearInfo();
      this.props.handleFlashMessage("Delete Successful");
    },error=>{})
  }

  render() {
    let update_modal;
    let background_color = {
      background: this.props.color,
    }

    if (this.state.isClick){
      update_modal = <WearUpdateModal
                      key={this.props.id}
                      id={this.props.id}
                      img={this.props.img}
                      type={this.props.type}
                      brand={this.props.brand}
                      color={this.props.color}
                      closeUpdateModal={()=>{this.closeUpdateModal();}}
                      addWearInfo={()=>{this.props.addWearInfo();}}
                      handleFlashMessage={(message)=>{this.props.handleFlashMessage(message);}}
                     />
    }

    return (
      <React.Fragment>
        <div className="card wear-card">
          <div className="card__image" onClick={this.handleClickImage}>
            <img src={this.props.img}/>
          </div>
          <div className="card__content">
            <ul>
              <li>Type: &nbsp;&nbsp;{this.props.type}</li>
              <li>Brand: {this.props.brand}</li>
              <li className="wear-color">
                <p>Color:&nbsp;</p>
                <div className="wear-color__box" style={background_color}></div>
              </li>
            </ul>
            <i onClick={this.deleteWearData} className="Large material-icons wear-delete-btn">delete</i>
          </div>
        </div>
        {update_modal}
      </React.Fragment>
    );
  }
}

export default WearCard;