import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// this is used to create scrollbars on windows devices like the ones from apple devices
import * as Ps from 'perfect-scrollbar';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css';

import HeaderLinks from 'components/Header/HeaderLinks.jsx';

import Dashboard from 'views/Dashboard/Dashboard.jsx';
import Team from 'views/Team/Team.jsx';

// backgroundImage for Sidebar
import image from 'assets/img/landing.background.sml.jpg';
// logo for sidebar

import dashRoutes from 'routes/dash.jsx';

const bgImage = {backgroundImage: "url("+image+")"};

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            openAvatar: false,
            openComponents: (this.activeRoute("/components") !== '' ? true:false),
            openForms: (this.activeRoute("/forms") !== '' ? true:false),
            openTables: (this.activeRoute("/tables") !== '' ? true:false),
            openMaps: (this.activeRoute("/maps") !== '' ? true:false),
            openPages: (this.activeRoute("/pages") !== '' ? true:false),
            isWindows: (navigator.platform.indexOf('Win') > -1 ? true : false),
            width: window.innerWidth
        }
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    // if the windows width changes CSS has to make some changes
    // this functions tell react what width is the window
    updateDimensions(){
        this.setState({width:window.innerWidth});
    }
    componentDidMount() {
        this.updateDimensions();
        // add event listener for windows resize
        window.addEventListener("resize", this.updateDimensions.bind(this));
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            Ps.initialize(this.refs.sidebarWrapper, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    componentDidUpdate(){
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            setTimeout(() => { Ps.update(this.refs.sidebarWrapper) }, 350);
        }
    }
    // function that creates perfect scroll bar for windows users (it creates a scrollbar that looks like the one from apple devices)
    isMac(){
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
    render(){
        console.log("this.props in sidebar", this.props.teams.filter(team => team.teamType == "location"));
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

            <div className="sidebar" data-color="black" data-image={image}>
                <div className="sidebar-background" style={bgImage}></div>
                <div className="logo text-center">

                	<a href="/" className="simple-text logo-normal">
                		{this.props.organization !== null ? this.props.organization.organizationName : "loading..."}
                	</a>
                </div>
                <div className="sidebar-wrapper" ref="sidebarWrapper">
                    <ul className="nav">
                        {/* If we are on responsive, we want both links from navbar and sidebar
                            to appear in sidebar, so we render here HeaderLinks */}
                        { this.state.width <= 992 ? (<HeaderLinks />):null }
                        {/*
                            here we render the links in the sidebar
                            if the link is simple, we make a simple link, if not,
                            we have to create a collapsible group,
                            with the speciffic parent button and with it's children which are the links
                        */}
                        {
                            additionalRoutes.map((prop,key) => {
                                var st = {};
                                st[prop["state"]] = !this.state[prop.state];
                                let newState = this.state
                                if(this.activeRoute(prop.path) == 'active'){
                                    newState[`${prop.state}`] = true
                                }
                                if(prop.render){
                                    if(prop.collapse){
                                        return (
                                            <li className={this.activeRoute(prop.path)} key={key}>
                                                <a onClick={ ()=> this.setState(st)}>
                                                    <i className={prop.icon}></i>
                                                    <p>{prop.name}
                                                       <b className={this.state[prop.state] ? "caret rotate-180":"caret"}></b>
                                                    </p>
                                                </a>
                                                <Collapse in={newState[prop.state]}>
                                                    <ul className="nav">
                                                        {
                                                            prop.views.map((prop,key) => {
                                                                console.log("prop.path",prop.path)
                                                                return (
                                                                    <li className={this.activeRoute(prop.path)} key={key}>
                                                                        <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                                            <span className="sidebar-mini">{prop.mini}</span>
                                                                            <span className="sidebar-normal">{prop.name}</span>
                                                                        </NavLink>
                                                                    </li>
                                                                );
                                                            })
                                                        }
                                                    </ul>
                                                </Collapse>
                                            </li>
                                        )
                                    } else {
                                        if(prop.redirect){
                                            return null;
                                        }
                                        else{
                                            return (
                                                <li className={this.activeRoute(prop.path)} key={key}>
                                                    <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                        <i className={prop.icon}></i>
                                                        <p>{prop.name == "User" && this.props.user ? this.props.user.username : prop.name}</p>
                                                    </NavLink>
                                                </li>
                                            );
                                        }
                                    }
                                }
                            })
                        }
                       
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
