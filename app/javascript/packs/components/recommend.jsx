import React, { Component, PropTypes } from 'react';
import WearCard from './wear_card'
import axios from 'axios'

class Recommend extends Component {
  constructor(props){
    super(props);
    this.state = {
      image_info: [],
    }
  }

  componentDidMount() {
    axios.get('/recommend')
    .then(res=>{
      this.setState({image_info: res.data})
    })
  }

  render() {
    var recommend_wears = [];

    for(var i=0; i < this.state.image_info.length; i++){
      recommend_wears.push(
                            <a href={this.state.image_info[i].href} key={"recommend_wear"+i}>
                              <img key={"recommend_wear"+i} src={this.state.image_info[i].src}/>
                            </a>)
    }

    return (
      <div className="recommend">
        <h4>Recommend Item!</h4>
        <div className="recommend__card-list">
          {recommend_wears}
        </div>
      </div>
    );
  }
}

export default Recommend;
