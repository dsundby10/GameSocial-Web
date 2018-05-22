import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';
import _ from 'lodash';

import CommonInput from "./Common.Input";
import FormDropzone from '../component/Form.Dropzone';
import {CloudinaryConfig} from "../cloudinary";
import axios from "axios/index";

import {updateUserProfile} from '../actions/action.user';

class FormEditProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      editName: '',
      editBio: '',
      disabled: false,
      fileUrl: '',
      fileProgress: null,
      fileStatus: null,
      fileSelected: [],
      fileError: {
        status: false,
        msg: ''
      },
    };
  }

  onSubmit(values, userId, file) {
    if(_.isEmpty(file)){
      return alert('File not selected or still uploading!');
    }
    console.log(file);
    console.log(values);
    this.props.updateUserProfile(userId, values, file);
    this.props.dispatch(reset('editProfile'));
  }

  onFileSelect(file) { // = (e) => {
    const unsignedUploadPreset = CloudinaryConfig.cloud_name;
    const thisComponent = this;
    const fileSelected = file[0]; //e.target.files[0];

    //TODO: Remove dubug
    console.log(fileSelected);

    // Check image type
    const imageFileType = fileSelected.name.split('.').pop().toLowerCase();
    const hasImageIndex = _.some(['gif', 'webp', 'bmp', 'flif', 'ico', 'jpg', 'jpe', 'jpeg', 'jpc', 'jp2', 'j2k', 'wdp', 'jxr', 'hdp', 'png', 'psd', 'tga', 'tif', 'tiff'], function (o) {
      return o === imageFileType;
    });

    // If correct file create form data and axios POST to cloudinary
    if (hasImageIndex) {
      const data = new FormData();
      const timestamp = Date.now()/1000;

      data.append('file', fileSelected);
      data.append('upload_preset', unsignedUploadPreset);
      data.append('api_key', CloudinaryConfig.apiKey);
      data.append('timestamp', timestamp);

      let config = {
        // headers: { "X-Requested-With": "XMLHttpRequest" },
        onUploadProgress: function (progressEvent) {
          let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          thisComponent.setState({fileProgress: progress});
          if (progress === 100) {
            console.log('COMPLETE!');
            thisComponent.setState({fileStatus: 'Complete'});
          } else {
            thisComponent.setState({fileStatus: 'Uploading...'});
          }
        }
      };

      const url = CloudinaryConfig.imageUrl;

      //TODO: Remove debug
      console.log(url);

      axios.post(url, data, config)
        .then(res => {
          //TODO: Remove dubug
          console.log(res);

          let fileError = {
            status: false,
            msg: ''
          };

          //let vidUrl = resUrl + res.data.public_id + "." + res.data.format;
          thisComponent.setState({
            fileError: fileError,
            fileSelected: res.data,
            fileUrl: res.data.secure_url
          });
        })
        .catch(error => {
          console.log(error);
          let videoError = {
            status: true,
            msg: error.message + ': File size is likely too big.'
          };
          thisComponent.setState({videoError: videoError});
        })
    } else {

      let videoError = {
        status: true,
        msg: 'Unsupported file type: ' + imageFileType
      };
      thisComponent.setState({videoError: videoError});
    }
  };

  handleOnDrop = (files)=>{
    this.setState({
      files,
      disabled: files.length === 1
    });
    this.onFileSelect(files)
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render(){
    const {fileSelected} = this.state;
    const {userId} = this.props;
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 m-auto">
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values, userId, fileSelected))}>
              <Field
                label="Edit Name"
                name="editName"
                component={CommonInput}
                type="text"
                onChange={this.handleChange}/>
              <Field
                label="Edit Bio"
                name="editBio"
                component={CommonInput}
                type="textarea"
                onChange={this.handleChange}/>
              <FormDropzone
                fileLabel="Avatar"
                fileType="image/*"
                handleOnDrop={this.handleOnDrop.bind(this)}
                disabled={this.state.disabled}
                file={this.state.fileSelected}
                directions="Drop or click to upload an avatar for your profile picture."/>
              <button
                className="btn btn-primary col-sm-12"
                type="submit" disabled={this.props.pristine || this.props.submitting}>
                Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser.uid
});

FormEditProfile = connect(mapStateToProps,{updateUserProfile})(FormEditProfile);

export default reduxForm({
  form: 'editProfile',
})(FormEditProfile);