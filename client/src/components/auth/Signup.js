import React from "react";
import { reduxForm, Field, reset } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";

class Signup extends React.Component {
  state = {
    errorPassword: "",
    validPassword: "",
    passwordConfirm: "",
    errorEmail: "",
  };
  
  handleChange = event => {
    this.setState({ passwordConfirm: event.target.value });
  };

  onSubmit = (formProps, dispatch) => {
    // Validate Email
    const email = formProps.email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkEmail = re.test(email)
    // Validate Password
    const password = formProps.password
    const pass = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
    const checkPassword = pass.test(password)
    if (checkPassword){
      this.setState({validPassword: ""})
    } else{
      this.setState({validPassword: "must contains one lowercase characters, one uppercase characters, least 6 characters and maximum of 20"})
    }
    if (checkEmail){
      this.setState({ errorEmail: ""});
      if (formProps.password === this.state.passwordConfirm && checkPassword) {
        this.setState({ errorPassword: ""});
        this.props.signup(formProps, () => {
          dispatch(reset('signup'));
          this.props.history.push("/feature");
        });
      } else {
        this.setState({
          errorPassword: "The two password are not the same"
        });
      }
    } else {
      this.setState({
        errorEmail: "Email is invalid"
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;
  
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h4 className="center">
            Sign Up <i className="fas fa-user-plus" />
          </h4>
          <div className="input-field">
            <div style={{color: 'red', marginLeft: '45px'}}>{this.props.errorMessage}</div>
            <div style={{color: 'red', marginLeft: '45px'}}>{this.state.errorEmail}</div>
            <i className="material-icons prefix">email</i>
            <Field
              name="email"
              type="text"
              component="input"
              autoComplete="none"
              placeholder="email"
              required
            />
          </div>

          <div className="input-field">
            <div style={{color: 'red', marginLeft: '45px'}}>{this.state.validPassword}</div>
            <i className="material-icons prefix">lock</i>
            <Field
              name="password"
              type="text"
              component="input"
              autoComplete="none"
              placeholder="password"
            />
          </div>

          <div className="input-field">
            <div style={{color: 'red', marginLeft: '45px'}}>{this.state.errorPassword}</div>
            <i className="material-icons prefix">lock</i>
            <input
              name="passwordConfirm"
              type="text"
              component="input"
              autoComplete="none"
              placeholder="password Confirm"
              onChange={this.handleChange}
            />
          </div>
          
          <button className="waves-effect waves-light btn">
            <i className="material-icons right">cloud</i>Sign Up
          </button>
        </form>
        <ul>
          <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/google" className="waves-effect waves-light btn social google">
          <i className="fab fa-google"></i> Sign in with google</a></li>
          <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/linkedin" className="waves-effect waves-light btn social linkedin">
          <i className="fab fa-linkedin"></i> Sign in with linkedin</a></li>
          <li style={{listStyle:'none', paddingBottom: '10px'}}><a href='/auth/facebook'className="waves-effect waves-light btn social facebook">
          <i className="fab fa-facebook"></i> Sign in with facebook</a></li>
          <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/instagram" className="waves-effect waves-light btn social instagram">
          <i className="fab fa-instagram"></i> Sign in with instagram</a></li>
      </ul>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToPros,
    actions
  ),
  reduxForm({ form: "signup", })
)(Signup);
