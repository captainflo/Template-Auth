import React, { Component } from 'react';
import { connect } from 'react-redux';

// Export function 
export default (ChildComponent) =>{
    class ComposedComponent extends Component {

        // our component just got rendered
        componentDidMount(){
            this.shouldNavigateAway();
        }
        // our component just got updated
        componentDidUpdate(){
            this.shouldNavigateAway();
        }

        shouldNavigateAway(){
            if(!this.props.auth){
                this.props.history.push('/');
            }
        }

        render(){
            return (
                <ChildComponent
                 {...this.props}
                />
            )
        }
    }

    function mapStateToProps(state){
        console.log(state);
        return {auth: state.auth.authenticated, authReducer: state.authReducer}
    }

    return connect(mapStateToProps)(ComposedComponent);
};
