import React, {Component} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';



import { connect } from 'react-redux'


import {AddPropsToRoute} from 'utility/utilityFunctions'

import appRoutes from 'routes/app.jsx';

class App extends Component{
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.action === "PUSH" && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render(){
        return (
            <Switch>
                    {appRoutes.map((prop,key) => {
                        return (
                            <Route path={prop.path} component={AddPropsToRoute(prop.component, this.props)} key={key} />
                        );
                    })}
            </Switch>
        );
    }
}

function mapStateToProps(state) {
  
  const {   auth  } = state

  const {   isAuthenticated, thisTest, user, organization, surveys } = auth
  
  return {
    isAuthenticated,
    thisTest,
    user,
    organization,
    surveys
  }
}



export default connect(mapStateToProps)(App);
