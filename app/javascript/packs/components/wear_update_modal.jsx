import React, { Component, PropTypes } from 'react';
import axios from 'axios';

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class WearUpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      brand: '',
      color: '',
      color_red: '',
      color_green: '',
      color_blue: '',
    }
    this.updateWearData             = this.updateWearData.bind(this)
    this.handleChangeWearType       = this.handleChangeWearType.bind(this)
    this.handleChangeWearBrand      = this.handleChangeWearBrand.bind(this)
    this.handleChangeWearColorRed   = this.handleChangeWearColorRed.bind(this)
    this.handleChangeWearColorGreen = this.handleChangeWearColorGreen.bind(this)
    this.handleChangeWearColorBlue  = this.handleChangeWearColorBlue.bind(this)
    this.calculateColor             = this.calculateColor.bind(this)
    this.getWearAdvise              = this.getWearAdvise.bind(this)

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
  }

  componentDidMount(){
    let color_rgb;

    if (this.props.color) {
      color_rgb = this.props.color.replace(/#/g, '').match(/.{2}/g);
      this.setState({
        type: this.props.type,
        brand: this.props.brand,
        color: this.props.color,
        color_red: parseInt(color_rgb[0], 16),
        color_green: parseInt(color_rgb[1], 16),
        color_blue: parseInt(color_rgb[2], 16),
      })
    }else{
      this.setState({
        type: this.props.type,
        brand: this.props.brand,
        color: this.props.color,
        color_red: '',
        color_green: '',
        color_blue: '',
      })
    }
  }

  updateWearData(event){
    event.preventDefault();

    let formData = new FormData();
    formData.append('wear[wtype]', this.state.type);
    formData.append('wear[brand]', this.state.brand);
    formData.append('wear[color]', this.state.color);

    axios.put(`/wears/${this.props.id}`,
               formData,
               {headers: {'content-type': 'multipart/form-data',}}
              )
    .then(res=>{
      this.props.closeUpdateModal();
      this.props.addWearInfo();
      this.props.handleFlashMessage('Update Successful');
    },error=>{
      console.info(error);
    });
  }

  handleChangeWearType(event){
    this.setState({
      type: event.target.value,
    })
  }

  handleChangeWearBrand(event){
    this.setState({
      brand: event.target.value,
    })
  }

  handleChangeWearColorRed(event){
    this.setState({
      color_red: Number(event.target.value),
    },()=>{this.calculateColor();})
  }


  handleChangeWearColorGreen(event){
    this.setState({
      color_green: Number(event.target.value),
    },()=>{this.calculateColor();})
  }

  handleChangeWearColorBlue(event){
    this.setState({
      color_blue: Number(event.target.value),
    },()=>{this.calculateColor();})
  }

  getWearAdvise(){
    axios.get(`/wears/${this.props.id}/advise`)
    .then(res=>{
      this.props.handleWearAdvise(res.data);
    },error=>{
      console.info(error);
    });
  }

  calculateColor(){
    const colors = [
      this.state.color_red.toString(16),
      this.state.color_green.toString(16),
      this.state.color_blue.toString(16),
    ]

    let colors_hex = colors.map(color => {
      if(color.length == 1){
        return `0${color}`
      }
      return color
    })

    this.setState({
      color: `#${colors_hex[0]+colors_hex[1]+colors_hex[2]}`,
    },()=>{})
  }

  render() {
    let background_color = {
      background: this.state.color,
    }

    return (
      <div className="wear-update-modal">
        <div className="wear-update-modal__black" onClick={this.props.closeUpdateModal}>
        </div>
        <div className="update-area">
          <img src={this.props.img} className="wear-image"/>
          <form className="update-form">
            <div className="type-brand">
              <div className="input-field col s6">
                <input onChange={this.handleChangeWearType} id="update-type" type="text" className="validate" defaultValue={this.state.type} />
                <label className="active" htmlFor="update-type">Type</label>
              </div>
              <div className="input-field col s6">
                <input onChange={this.handleChangeWearBrand} id="update-brand" type="text" className="validate" defaultValue={this.state.brand} />
                <label className="active" htmlFor="update-brand">Brand</label>
              </div>
            </div>
            <div className="color-rgb">
              <div className="input-field col s6 color-num">
                <input onChange={this.handleChangeWearColorRed} id="update-color-red" type="text" className="validate" defaultValue={this.state.color_red} />
                <label className="active" htmlFor="update-color-red">Color Red</label>
              </div>
              <div className="input-field col s6 color-num">
                <input onChange={this.handleChangeWearColorGreen} id="update-color-green" type="text" className="validate" defaultValue={this.state.color_green} />
                <label className="active" htmlFor="update-color-green">Color Green</label>
              </div>
              <div className="input-field col s6 color-num">
                <input onChange={this.handleChangeWearColorBlue} id="update-color-blue" type="text" className="validate" defaultValue={this.state.color_blue} />
                <label className="active" htmlFor="update-color-blue">Color Blue</label>
              </div>
              <div onClick={this.getWearAdvise} className="how-style">
                <p>How to Style?</p>
                <div className="wear-color__box" style={background_color}></div>
              </div>
            </div>
            <button onClick={this.updateWearData} className="send-btn btn waves-effect waves-light red lighten-2" type="submit" name="action">Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default WearUpdateModal;
