import React from 'react';
import { connect } from 'react-redux';

class Welcome extends React.Component{
    render(){
        return(
            <div>
                hello
            </div>
        )
    }
}

function mapStateToProps(state){
    return {auth: state.auth.authenticated, authbyother: state.auth}
}

export default connect(mapStateToProps)(Welcome);
