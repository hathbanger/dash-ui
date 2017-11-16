import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

import { loginUser, logoutUser, validateToken } from '../../actions/authActions'

class LoginPage extends Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            cardHidden: true,
            username: "",
            password: "",
        }
    }
    componentDidMount(){
        setTimeout(function() { this.setState({cardHidden: false}); }.bind(this), 700);
    }

    handleFormStateUpdate(e){
        if(e.target.id == "username"){
            this.setState({username: e.target.value})
        } else if (e.target.id == "password") {
            this.setState({password: e.target.value})
        }
    }

    handleFormLoginSubmission(e){
        e.preventDefault();
        let creds = {"username": this.state.username, "password": this.state.password}
        this.props.dispatch(loginUser(creds))
    }


    render(){
        return (
            <Grid>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel>
                                                Username
                                            </ControlLabel>
                                            <FormControl
                                                onChange={e => this.handleFormStateUpdate(e)}
                                                placeholder="Enter username"
                                                type="username"
                                                id="username"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                onChange={e => this.handleFormStateUpdate(e)}
                                                placeholder="Password"
                                                type="password"
                                                id="password"
                                            />
                                        </FormGroup>
                                    </div>
                                }
                                legend={
                                    <Button onClick={e => this.handleFormLoginSubmission(e)} bsStyle="info" fill wd>
                                        Login
                                    </Button>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default LoginPage;
