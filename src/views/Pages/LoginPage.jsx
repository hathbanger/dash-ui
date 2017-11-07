import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardHidden: true
        }
    }
    componentDidMount(){
        var cat = localStorage.getItem("cat")
        if(cat === 'cat'){
            this.props.history.push('/');
        }
        setTimeout(function() { this.setState({cardHidden: false}); }.bind(this), 700);
    }

    fakeLogin(){
        localStorage.setItem('cat', 'cattt');
        window.location.reload();
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
                                                Email address
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter email"
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Password"
                                                type="password"
                                            />
                                        </FormGroup>
                                    </div>
                                }
                                legend={
                                    <Button onClick={this.fakeLogin} bsStyle="info" fill wd>
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
