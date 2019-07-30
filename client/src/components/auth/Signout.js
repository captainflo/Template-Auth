import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Signout extends React.Component{
    componentDidMount(){
        this.props.signout();
        this.props.history.push("/");
    }
    render(){
        return(
            <div>Sorry to see you go</div>
        )
    }
}

function mapStateToPros(state) {
    return {
      errorMessage: state.auth.errorMessage,
      auth: state.auth,
      authReducer: state.authReducer
    };
  }
export default connect(mapStateToPros, actions)(Signout);