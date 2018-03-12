import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Media,
    FormControl, FormGroup
} from 'react-bootstrap';

import { validateToken } from '../../actions/authActions'
import { createUser } from '../../actions/userActions'
import { retrieveOrganization, createOrganization } from '../../actions/organizationActions'

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class RegisterPage extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            cardHidden: true,
            username: "",
            phoneNumber: "",
            password: "",
            passwordConfimation: "",
            fetchOrg: false,
        }
    }

    handleFormStateUpdate(e){
        if(e.target.id == "username"){
            this.setState({username: e.target.value})
        } else if (e.target.id == "password" ) {
            this.setState({password: e.target.value})
        } else if (e.target.id == "organizationId"){
            this.setState({organizationId: e.target.value})
        } else if (e.target.id == "phoneNumber"){
            this.setState({phoneNumber: e.target.value})
        } else if (e.target.id == "organizationName"){
            this.setState({newOrganization: e.target.value})
        }
    }

    handleFormLoginSubmission(e){
        e.preventDefault();
        let creds = {   "username": this.state.username, 
                        "phoneNumber":this.state.phoneNumber,
                        "password": this.state.password,
                        "organization": this.props.location.search.split("=")[1],
                        "organizationName": this.state.newOrganization}
        console.log("CREDS IN FORM REGISTER", creds)
        this.props.dispatch(createUser(creds))
    }



    render(){
        let organizationId = this.props.location.search.split("=")[1]
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <div className="header-text">
                            <h2>Serene</h2>
                            <h4>Register for free and experience the dashboard today</h4>
                            <hr />
                        </div>
                    </Col>
                    <Col md={4} mdOffset={2}>
                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-user"></i>
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>
                                    Free Account
                                </Media.Heading>
                                Here you can write a feature description for your dashboard, let the users know what is the value that you give them.
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-graph1"></i>
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>
                                    Awesome Performances
                                </Media.Heading>
                                Here you can write a feature description for your dashboard, let the users know what is the value that you give them.
                            </Media.Body>
                        </Media>
                    </Col>
                    <Col md={4}>
                        <form>
                            <Card
                                plain
                                content={
                                    <div>
                                        <FormGroup>
                                            <FormControl
                                                onChange={e => this.handleFormStateUpdate(e)}
                                                type="text"
                                                placeholder="Username"
                                                id="username"
                                            />
                                        </FormGroup>
                                        {organizationId &&
                                            <FormGroup>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Company"
                                                    id="organizationId"
                                                    value={organizationId}
                                                    disabled={organizationId.length > 0}
                                                />
                                            </FormGroup>
                                        }
                                        <FormGroup>
                                            <FormControl
                                                onChange={e => this.handleFormStateUpdate(e)}
                                                type="phone"
                                                placeholder="Phone"
                                                id="phoneNumber"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl
                                                onChange={e => this.handleFormStateUpdate(e)}
                                                type="password"
                                                placeholder="Password"
                                                id="password"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl
                                                onChange={e => this.handleFormStateUpdate(e)}
                                                type="password"
                                                placeholder="Password Confirmation"
                                                id="passwordConfimation"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl
                                                onChange={e => this.handleFormStateUpdate(e)}
                                                type="text"
                                                placeholder="Organization Name"
                                                id="organizationName"
                                            />
                                        </FormGroup>
                                    </div>
                                }
                                ftTextCenter
                                legend={
                                    <Button onClick={e => this.handleFormLoginSubmission(e)} wd fill neutral>
                                        Create Free Account
                                    </Button>
                                }
                            />
                        </form>
                    </Col>                     
                </Row>
            </Grid>
        );
    }
}

export default RegisterPage;
