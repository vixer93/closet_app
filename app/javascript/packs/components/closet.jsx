import React, { Component, PropTypes } from 'react';
import WearCard from './wear_card'
import WearRegistModal from './wear_regist_modal'
import axios from 'axios';

class Closet extends Component {
  constructor(props){
    super(props);
    this.state = {
      wears: [],
      isClick: false,
    }
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  componentDidMount() {
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

  render() {
    var modal;
    var wear_cards = [];

    if (this.state.isClick){
      modal = <WearRegistModal
                closeModal={()=>{this.closeModal();}}
              />
    }

    for(var i=0; i<this.state.wears.length; i++){
      var tmp = this.state.wears[i].image.url.split("/");
      var image_name = tmp[tmp.length-1];
      wear_cards.push(<WearCard
                        key={this.state.wears[i].id}
                        img={"../image/"+this.state.wears[i].id+"/"+image_name}
                        type=""
                        brand={this.state.wears[i].brand}
                        color=""
                      />)
    }

    return (
      <div className="closet">
        <h4>My Closet</h4>
        <button onClick={()=>{this.handleClickButton()}} className="btn-floating btn-large waves-effect waves-light brown darken-2 add-wear">
          <i className="material-icons">add</i>
        </button>
        <div className="closet__card-list">
          {wear_cards}
        </div>
        {modal}
      </div>
      );
  }
}

export default Closet;
