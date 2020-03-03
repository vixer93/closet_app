import React, { Component, PropTypes } from 'react';
import axios from 'axios';

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

class WearRegistModal extends Component {
  constructor(props){
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      image_url: '',
      image_name: '',
      brand: '',
      btn_disable: true,
      sending: false,
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.createWearData   = this.createWearData.bind(this);

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
  }

  handleChangeName(event){
    this.setState({
      brand: event.target.value,
    })
  }

  handleChangeFile(event){
    var file       = event.target.files[0];
    var image_url  = createObjectURL(file);
    var image_name = file.name;

    this.setState({
      image:       image_name,
      image_url:   image_url,
      image_name:  image_name,
      btn_disable: false,
    })
  }

  createWearData(event){
    event.preventDefault();
    this.setState({
      btn_disable: true,
      sending:     true
    });

    var formData = new FormData();
    formData.append('wear[image]',this.fileInput.current.files[0]);
    formData.append('wear[brand]', this.state.brand);

    axios.post('/wears',
               formData,
               {headers: {'content-type': 'multipart/form-data',}}
              )
    .then(res=>{
      this.props.addWearInfo();
      this.props.closeModal();
      this.props.handleFlashMessage('Create Successful');
      this.setState({
        btn_disable: false,
        sending: false
      })
    },error=>{
      console.info(error);
    });
  }

  render() {
    if (this.state.image_url != ""){
      var img_preview = <img src={this.state.image_url} />
    }

    if (this.state.sending) {
      var sending = <div className="loading">
                      <div className="loading__contents">
                        <div className="now-loading"></div>
                        <p>Sending</p>
                      </div>
                    </div>
    }

    return (
      <React.Fragment>
        {sending}
        <div className="wear-regist-modal">
          <div className="wear-regist-modal__contents">
            <button onClick={this.props.closeModal} className="close-btn">
            </button>
            <div className="selected-img">
              {img_preview}
            </div>
            <form className="input-wear-info">
              <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input type="file" onChange={this.handleChangeFile} ref={this.fileInput}/>
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" defaultValue={this.state.image_name}/>
                </div>
              </div>
              <div className="input-field col s6">
                <input onChange={this.handleChangeName} id="brand" type="text" className="validate" value={this.state.brand}/>
                <label className="active" htmlFor="brand">Brand</label>
              </div>
              <button onClick={this.createWearData} disabled={this.state.btn_disable} className="send-btn btn waves-effect waves-light red lighten-2" type="submit" name="action">Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WearRegistModal;
