import React, { Component } from 'react';
import {
    Navbar, Nav, NavItem, NavDropdown, MenuItem,
    FormGroup, FormControl, InputGroup
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { loginUser, logoutUser, validateToken } from '../../actions/authActions'

class HeaderLinks extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Nav pullRight>    
                    <NavDropdown
                        eventKey={4}
                        title={(
                            <div>
                                <i className="fa fa-list"></i>
                                <p className="hidden-md hidden-lg">
                                    More
                                    <b className="caret"></b>
                                </p>
                            </div>
                        )} noCaret id="basic-nav-dropdown-3" bsClass="dropdown-with-icons dropdown">
                        <MenuItem onClick={e => this.props.dispatch(logoutUser())} eventKey={4.5}><div className="text-danger"><i className="pe-7s-close-circle"></i> Log out</div></MenuItem>
                    </NavDropdown>
                </Nav>
            </div>
        );
    }
}
export default HeaderLinks;
