import React, { Component, PropTypes } from 'react';
import WearCard from './wear_card'
import WearRegistModal from './wear_regist_modal'
import axios from 'axios';

class Closet extends Component {
  constructor(props){
    super(props);
    this.state = {
      isClick: false,
    }
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  componentDidMount() {
    
  }

  handleClickButton(){
    this.setState({isClick: true});
  }

  closeModal(){
    this.setState({isClick: false});
  }

  render() {
    var modal;
    if (this.state.isClick){
      modal = <WearRegistModal
                closeModal={()=>{this.closeModal();}}
              />
    }

    return (
      <div className="closet">
        <h4>My Closet</h4>
        <button onClick={()=>{this.handleClickButton()}} className="btn-floating btn-large waves-effect waves-light brown darken-2 add-wear">
          <i className="material-icons">add</i>
        </button>
        <div className="closet__card-list">
          <WearCard
            img=""
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
        {modal}
      </div>
      );
  }
}

export default Closet;
