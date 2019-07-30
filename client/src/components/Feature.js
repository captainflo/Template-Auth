import React from 'react';
import { connect } from 'react-redux';


class Feature extends React.Component{
    renderLinks(){
        if (this.props.authenticated || this.props.authReducer){
            return (
                <div>
                   <div>You are in feature :)</div>
                </div>
            )
        } else {
            return(<div>Youy must be login!</div>)
        }
    }
    render(){
        return(
            <div>
                {this.renderLinks()}
            </div>
        )
    }
}

function mapStateToPros(state) {
    console.log(state)
    return { authenticated: state.auth.authenticated, authReducer: state.authReducer };
  }

export default connect(mapStateToPros)(Feature);
