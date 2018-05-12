import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, reset} from 'redux-form';

import {getAuth} from "../actions/action.auth";

import Input from "./Input";

import {loginEmailPassword} from '../actions/action.auth';

class FormLogin extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit(values) {
    this.props.loginEmailPassword(values);
    this.props.dispatch(reset('login'));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 m-auto">
            <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
              <Field
                label="Email"
                name="loginEmail"
                component={Input}
                type="text" required
                onChange={this.handleChange}/>
              <Field
                label="Password"
                name="loginPassword"
                component={Input}
                type="password" required
                onChange={this.handleChange}/>
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

FormLogin = connect(null, {loginEmailPassword, getAuth})(FormLogin);

export default reduxForm({
  form: 'login',
})(FormLogin);