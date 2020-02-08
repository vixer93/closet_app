import React, { Component, PropTypes } from 'react';

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
    this.handleChangeWearType       = this.handleChangeWearType.bind(this)
    this.handleChangeWearBrand      = this.handleChangeWearBrand.bind(this)
    this.handleChangeWearColorRed   = this.handleChangeWearColorRed.bind(this)
    this.handleChangeWearColorGreen = this.handleChangeWearColorGreen.bind(this)
    this.handleChangeWearColorBlue  = this.handleChangeWearColorBlue.bind(this)
    this.calculateColor             = this.calculateColor.bind(this)
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
    },()=>{console.log(this.state.color)})
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
              <div className="wear-color__box" style={background_color}></div>
            </div>
            <button className="send-btn btn waves-effect waves-light red lighten-2" type="submit" name="action">Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default WearUpdateModal;
