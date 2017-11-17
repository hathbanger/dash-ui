import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Media,
    FormControl, FormGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import ChatBot from 'views/Components/ChatBot.jsx';

class ChatbotDemo extends Component{

    constructor(props){
        super(props);
        
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <div className="header-text">
                        </div>
                    </Col>       
                </Row>
                <Row>
                    <ChatBot />                
                </Row>
            </Grid>
        );
    }
}

export default ChatbotDemo;
