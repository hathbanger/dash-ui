import React, { Component } from 'react';
import {
    ButtonGroup,
    Pagination,
    Grid, Row, Col
} from 'react-bootstrap';

import Button from 'elements/CustomButton/CustomButton.jsx';
const botProfile = {name: "Lou", bot: true, profPic: "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"}
const guestProfile = {name: "Guest", bot: false, profPic: "https://www.icbr.org/wp-content/uploads/2014/05/Avatar.jpg"}
const timeThen = new Date()
class ChatBot extends Component{

    constructor(props){
        super(props);
        this.state = {
        	messageStr: "",
        	messages: [],
        };        
    }

    componentDidUpdate(){
	   	var div = document.getElementById("msg_container_base");
	   	div.scrollTop = div.scrollHeight - div.clientHeight;    
	   	// if(this.state.messages.length == 6){
	   		// console.log("SUREVEY complete", this.state.messages)
			// console.log(this.state.messages.filter((msg) => msg.message) )
			// this.submitSurvey()
	   	// }	
    }

    componentDidMount(){
    	console.log("WOO!")
    	// this.messageBot("Serene");

	    this.connection = new WebSocket('ws://localhost:3030');
	    this.connection.onmessage = evt => { 
	      console.log("MESSAGE", evt.data)
	      // this.connection.send(evt.data);
	      this.setState({messages: [...this.state.messages, {user: botProfile, messageTime: new Date(), message: evt.data}]})
	    }
    }

    handleFormStateUpdate(e){
        this.setState({messageStr: e.target.value})
    }

    handleFormLoginSubmission(e){
        e.preventDefault();
    	let messageTime = new Date();
        this.setState({messageStr: "", messages: [...this.state.messages, {user: guestProfile, messageTime: messageTime, message: this.state.messageStr}]})    
    	this.messageBot(this.state.messageStr);
	    this.connection.send(this.state.messageStr);
    }     

	messageBot(e){
    	let messageTime = new Date();
		// let config =  {
		//     method: 'POST',
		//     headers:  {
		//       'Content-Type':'application/json'
		//     },
		//     body: JSON.stringify({"message": e})
		// }
		// this.connection.send({"message": e})
    	// fetch("http://localhost:3030/", config)
	    // 	.then((response) => {
	    //     return response.json();
	    // }).then((data) => {
    	// 	messageTime = new Date();
    	// 	setTimeout(() => {
    	// 		let message = data.responseText;
	    // 		this.setState({messages: [...this.state.messages, {user: botProfile, messageTime: messageTime, message: message}]})
    	// 	}, Math.random() * 1000)
	    // });	
	}    


	submitSurvey(e){
		let surveyArray = []
		this.state.messages.forEach((message, index) => {
			console.log("INDEX", this.state.messages[index])
			if (index % 2 == 1){
				surveyArray.push([{"question": this.state.messages[index - 1].message},{"answer":this.state.messages[index].message}])
			}
		})
		let config =  {
		    method: 'POST',
		    headers:  {
		      'Content-Type':'application/json'
		    },
		    body: JSON.stringify({"content": surveyArray})
		}

    	fetch("http://localhost:1323/survey", config)
	    	.then((response) => {
	        return response.json();
	    }).then((data) => {
	    	console.log("DATA ABOUT THE SURVEY", data)
	    });	
	}

    handleFormEnterSubmission(e){
        if(e.key === 'Enter' && this.state.messageStr.length > 0){
	    	this.handleFormLoginSubmission(e);
	    	// let messageTime = new Date();
        	// this.setState({messageStr: "", messages: [...this.state.messages, {user: guestProfile, messageTime: messageTime, message: this.state.messageStr}]})
        }
    }    

    render(){
    	let now = new Date(); 
    	let timeDiff = now - timeThen;
    	timeDiff /= 1000

        return (
		<div className="chat-window col-md-12" id="chat_window_1">
	        <div className="col-md-8 col-md-offset-2">
	            <div className="panel panel-default">
	                <div className="panel-body msg_container_base" id="msg_container_base">
	                	{this.state.messages.map(function(messageObject, index){
	                		let minutesPassed = Math.round((((now - messageObject.messageTime) % 86400000) % 3600000) / 60000);
	                		if(messageObject.user.bot){
	                			return (
				                    <div key={index} className="row msg_container base_receive">
				                        <div className="col-md-2 col-xs-2 avatar">
				                            <img src={messageObject.user.profPic} className=" img-responsive "/>
				                        </div>
				                        <div className="col-md-10 col-xs-10">
				                            <div className="messages msg_receive">
				                                <p>{messageObject.message}</p>				                                
				                                <time>{messageObject.user.name} • {minutesPassed == 0 ? "Just now" : minutesPassed}{minutesPassed < 1 ? "" : "minutes ago"}</time>
				                            </div>
				                        </div>
				                    </div>
	                				)
	                		} else {
	                			return (
			                    <div key={index} className="row msg_container base_sent">
			                        <div className="col-md-10 col-xs-10">
			                            <div className="messages msg_sent">
			                                <p>{messageObject.message}</p>			                                
			                                <time>Guest • {minutesPassed == 0 ? "Just now" : minutesPassed}{minutesPassed < 1 ? "" : " minutes ago"}</time>
			                            </div>
			                        </div>
			                        <div className="col-md-2 col-xs-2 avatar">
			                            <img src={messageObject.user.profPic} className=" img-responsive "/>
			                        </div>
			                    </div>
			                    )
		                    }


	                    })}
	                </div>
	                <div className="panel-footer">
	                    <div className="input-group" onChange={e => this.handleFormStateUpdate(e)}>                   
	                        <input 
	                        	id="btn-input" 
	                        	type="text" 
	                        	value={this.state.messageStr}
	                        	className="form-control input-sm chat_input" 
	                        	placeholder="Write your message here..."
	                        	onKeyPress={e => this.handleFormEnterSubmission(e)} />
	                        <span className="input-group-btn">
	                        <button 
	                        	className="btn btn-primary btn-sm" 
	                        	id="btn-chat" 
	                        	onClick={e => this.handleFormLoginSubmission(e)}>Send</button>
	                        </span>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
 
        );
    }
}

export default ChatBot;
