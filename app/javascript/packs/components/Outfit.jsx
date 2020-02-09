import React, { Component, PropTypes } from 'react';
import WearCard from './wear_card'
import axios from 'axios'

class Outfit extends Component {
  constructor(props){
    super(props);
    this.state = {
      image_info: [],
    }
  }

  componentDidMount() {
    axios.get('/outfit')
    .then(res=>{
      this.setState({image_info: res.data})
    })
  }

  render() {
    var cordinates = [];

    for(var i=0; i < this.state.image_info.length; i++){
      cordinates.push(
                      <a href={this.state.image_info[i].href} key={"recommend_wear"+i}>
                        <img key={"recommend_wear"+i} src={this.state.image_info[i].src}/>
                      </a>)
    }

    return (
      <div className="outfit">
        <h4>What is Today's Outfit?</h4>
        <div className="outfit__card-list">
          {cordinates}
        </div>
      </div>
    );
  }
}

export default Outfit;
