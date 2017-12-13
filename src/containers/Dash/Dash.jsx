import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux'

// this is used to create scrollbars on windows devices like the ones from apple devices
import * as Ps from 'perfect-scrollbar';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';

import NotificationSystem from 'react-notification-system';


import Dashboard from 'views/Dashboard/Dashboard.jsx';
import Team from 'views/Team/Team.jsx';

import Sidebar from 'components/Sidebar/Sidebar.jsx';
import Header from 'components/Header/Header.jsx';
import Footer from 'components/Footer/Footer.jsx';

import {validateToken} from 'utility/utilityFunctions'
import {logoutUser, retrieveUser} from 'actions/authActions'

// dinamically create dashboard routes
import dashRoutes from 'routes/dash.jsx';

// style for notifications
import { style } from "variables/Variables.jsx";


const token = localStorage.getItem('id_token');
class Dash extends Component{
    constructor(props){
        super(props);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.state = {
            _notificationSystem: true
        };
    }
    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem});
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            Ps.initialize(this.refs.mainPanel, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    // function that shows/hides notifications - it was put here, because the wrapper div has to be outside the main-panel class div
    handleNotificationClick(position){
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }
        this.state._notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.
                </div>
            ),
            level: level,
            position: position,
            autoDismiss: 15,
        });
    }
    // function that creates perfect scroll bar for windows users (it creates a scrollbar that looks like the one from apple devices)
    isMac(){
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    componentDidUpdate(e){
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            setTimeout(() => { Ps.update(this.refs.mainPanel) }, 350);
        }
        if(e.history.action === "PUSH"){
            this.refs.mainPanel.scrollTop = 0;
        }

    }
    componentWillMount(){       
        if(document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
        let tokenValidation = validateToken(token)
        if(tokenValidation){
            if(tokenValidation.error == "token invalid"){
                this.props.dispatch(logoutUser())
                this.props.history.push('/auth/lock-page');
            } else if( tokenValidation.error == "token expired" ) {
                this.props.dispatch(logoutUser())
                this.props.history.push('/auth/lock-screen-page');
            }
        } else {
            this.props.dispatch(logoutUser())
        }
    }

    render(){
        let arrayOfIndices = []
        let arrayOfTypes = []
        this.props.teams.forEach(team => {
            let type = team.teamType;
            if(arrayOfIndices.indexOf(type) == -1){
                arrayOfIndices.push(team.teamType)
            }
        })
              
        arrayOfIndices.forEach(i => {
            arrayOfTypes.push(this.props.teams.filter(team => team.teamType == i))
        })

        let additionalRoutes = [...dashRoutes]

        arrayOfTypes.forEach(types => {
                let typeObj = {}
                typeObj.collapse = true;
                typeObj.icon = "pe-7s-note2";
                typeObj.name = types[0].teamType;
                typeObj.render = true;
                typeObj.path = `/${types[0].teamType.toLowerCase()}`;
                typeObj.state = `${types[0].teamType.toLowerCase()}`;
                typeObj.views = [];
                types.forEach(type => {
                    type.icon = "pe-7s-rocket";
                    type.mini = "US";
                    type.name = type.teamName;
                    type.path = `${typeObj.path}/${type.teamName}`;
                    type.render = true;
                    type.component = Team;
                    typeObj.views.push(type);
                })  
                additionalRoutes.push(typeObj);
            });



        return (
            <div className="wrapper">
                <NotificationSystem ref="notificationSystem" style={style}/>
                <Sidebar {...this.props} />
                <div className={"main-panel"+(this.props.location.pathname === "/maps/full-screen-maps" ? " main-panel-maps":"")} ref="mainPanel">
                    <Header {...this.props}/>
                        <Switch>
                            {
                                additionalRoutes.map((prop,key) => {
                                    console.log("PROP IN ADDTL ROUTES", prop)
                                    if(prop.collapse){
                                        return prop.views.map((prop,key) => {
                                            if(prop.name === "Notifications"){
                                                return (
                                                    <Route
                                                        path={prop.path}
                                                        key={key}
                                                        render={routeProps =>
                                                           <prop.component
                                                               {...routeProps}
                                                               handleClick={this.handleNotificationClick}
                                                           />}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <Route path={prop.path} component={AddPropsToRoute(prop.component, this.props)} key={key} />
                                                );
                                            }
                                        })
                                    } else {
                                        if(prop.redirect)
                                            return (
                                                <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                                            );
                                        else
                                            return (
                                                <Route path={prop.path} component={AddPropsToRoute(prop.component, this.props)} key={key} />
                                            );
                                    }
                                })
                            }
                        </Switch>

                    <Footer fluid/>
                </div>
            </div>
        );
    }

}
const AddPropsToRoute = (WrappedComponent, passedProps)=>{
    return (
        class Route extends Component{
            render(){
                let props = Object.assign({}, this.props, passedProps)
                return  <WrappedComponent {...props} />
            }
        }
    )
}

export default Dash;
