import React, {Component} from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import Footer from 'components/Footer/Footer.jsx';
import PagesHeader from 'components/Header/PagesHeader.jsx';

// dinamically create pages routes
import pagesRoutes from 'routes/pages.jsx';

import {AddPropsToRoute, validateToken} from 'utility/utilityFunctions'

import bgImage from 'assets/img/landing.background.sml.jpg';

const token = localStorage.getItem('id_token');
class Pages extends Component{
    getPageClass(){
        var pageClass = "";
        switch (this.props.location.pathname) {
            case "/auth/login-page":
                pageClass = " login-page";
                break;
            case "/auth/register-page":
                pageClass = " register-page";
                break;
            case "/auth/lock-screen-page":
                pageClass = " lock-page";
                break;
            case "/auth/chatbot-demo":
                pageClass = " register-page";
                break;
            default:
                pageClass = "";
                break;
        }
        return pageClass;
    }
    componentWillMount(){
        if(document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
        let tokenValidation = validateToken(token)
        // if(tokenValidation){
        //     this.props.dispatch()
        // }         
    }

    render(){
        return (
            <div>
                <PagesHeader />
                <div className="wrapper wrapper-full-page">
                    <div className={"full-page"+this.getPageClass()} data-color="black" data-image={bgImage}>
                        <div className="content">
                            <Switch>
                                {
                                    pagesRoutes.map((prop,key) => {
                                        return (
                                            <Route path={prop.path} component={AddPropsToRoute(prop.component, this.props)}  key={key}/>
                                        );
                                    })
                                }
                            </Switch>
                        </div>
                        <Footer transparent/>
                        <div className="full-page-background" style={{backgroundImage: "url("+bgImage+")"}}></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Pages;
