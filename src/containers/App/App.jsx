import React, {Component} from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

// dinamically create app routes
import appRoutes from 'routes/app.jsx';

class App extends Component{
    componentWillMount(){
        var cat = localStorage.getItem("cat")
        var newcat = localStorage.getItem("newcat")
        console.log("CAT IN DASH", cat)
        if(cat && cat.length > 0){
            this.props.history.push('/lock-screen-page');
        }        
        if(cat == null){
            this.props.history.push('/register-page');
        }        
    }
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.action === "PUSH" && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    render(){
        return (
            <Switch>
                {
                    appRoutes.map((prop,key) => {
                        return (
                            <Route path={prop.path} component={prop.component} key={key} />
                        );
                    })
                }
            </Switch>
        );
    }
}

export default App;
