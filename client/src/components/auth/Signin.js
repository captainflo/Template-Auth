import React from "react";
import { reduxForm, Field, reset } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import "./Signin.css";

class Signin extends React.Component {
  onSubmit = (formProps, dispatch) => {
    this.props.signin(formProps, () => {
      dispatch(reset('signin'));
      this.props.history.push("/feature");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h4 className="center">Sign in <i className="fas fa-user-alt"></i></h4>

            <div className="input-field">
              <div style={{color: 'red', marginLeft: '45px'}}>{this.props.errorMessage}</div>
              <i className="material-icons prefix">email</i>
                <Field
                  name="email"
                  type="text"
                  component="input"
                  autoComplete="none"
                  placeholder="email"
                />
            </div>

           
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
              <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
                placeholder="password"
              />
          </div>
          <button className="waves-effect waves-light btn">
            <i className="material-icons right">cloud</i>Sign In
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
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth,
    authReducer: state.authReducer
  };
}

export default compose(
  connect(
    mapStateToPros,
    actions,
  ),
  reduxForm({ form: "signin" })
)(Signin);
