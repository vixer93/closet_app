import React, { Component, PropTypes } from 'react';
import WearCard from './wear_card'
import WearRegistModal from './wear_regist_modal'
import WearUpdateModal from './wear_update_modal'
import FlashMessage from './flash_message'
import axios from 'axios';

class Closet extends Component {
  constructor(props){
    super(props);
    this.state = {
      wears: [],
      isClick: false,
      hasFlash: false,
      FlashMessage: "message",
    }
    this.handleClickButton  = this.handleClickButton.bind(this)
    this.getWearIndex       = this.getWearIndex.bind(this)
    this.handleFlashMessage = this.handleFlashMessage.bind(this)
  }

  componentDidMount() {
    this.getWearIndex();
  }

  getWearIndex(){
    axios.get('/wears')
    .then(res=>{
      this.setState({wears: res.data})
    })
  }

  handleClickButton(){
    this.setState({isClick: true});
  }

  closeModal(){
    this.setState({isClick: false});
  }

  addWearInfo(){
    this.getWearIndex();
  }

  handleFlashMessage(message){
    if (this.state.hasFlash) {
      this.setState({hasFlash: false})
    }

    this.setState({
      hasFlash: true,
      FlashMessage: message,
    });
  }

  render() {
    let regist_modal;
    let flash_message;
    let wear_cards = [];


    if (this.state.isClick){
      regist_modal = <WearRegistModal
                closeModal={()=>{this.closeModal();}}
                addWearInfo={()=>{this.addWearInfo();}}
                handleFlashMessage={(message)=>{this.handleFlashMessage(message);}}
              />
    }

    if (this.state.hasFlash){
      flash_message = <FlashMessage
                        message={this.state.FlashMessage}
                      />;
      setTimeout(this.setState(), 5500, {hasFlash: false})
    }

    for(var i=0; i<this.state.wears.length; i++){
      wear_cards.push(<WearCard
                        key={this.state.wears[i].id}
                        id={this.state.wears[i].id}
                        img={this.state.wears[i].image}
                        type={this.state.wears[i].type}
                        brand={this.state.wears[i].brand}
                        color={this.state.wears[i].color}
                        addWearInfo={()=>{this.addWearInfo();}}
                        handleFlashMessage={(message)=>{this.handleFlashMessage(message);}}
                      />)
    }

    return (
      <div className="closet">
        <h4>My Closet</h4>
        <div className="effect-btn">
          <div className="circle layer1"></div>
          <div className="circle layer2"></div>
          <div className="circle layer3"></div>
          <button onClick={()=>{this.handleClickButton()}} className="btn-floating btn-large waves-effect waves-light brown darken-2 add-wear">
            <i className="material-icons">add</i>
          </button>
        </div>
        <div className="closet__card-list">
          {wear_cards}
        </div>
        {regist_modal}
        {flash_message}
      </div>
      );
  }
}

export default Closet;
