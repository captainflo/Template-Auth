import React from "react";
import Header from "./Header";
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from './actions'
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";

import Welcome from './Welcome';
import Feature from './Feature';
import Signout from './auth/Signout'

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
    // Sidebar
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path='/' component={Welcome}/>
          <Route path='/feature'  component={Feature}/>
          <Route path="/signout" component={Signout}/>
        </BrowserRouter>
        
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated, authReducer: state.authReducer };
}

export default connect(mapStateToPros, actions)(App);
