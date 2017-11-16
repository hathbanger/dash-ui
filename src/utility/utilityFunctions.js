import React, {Component} from 'react';

export function AddPropsToRoute(WrappedComponent, passedProps) {
    return (
        class Route extends Component{
            render(){
                let props = Object.assign({}, this.props, passedProps)
                return  <WrappedComponent {...props} />
            }
        }
    )
}

export function validateToken(token){
    var currentTime = Math.floor(new Date().getTime()/1000)
    var unmarshalledToken = unmarshallToken(token);
    if(unmarshalledToken){
      if(unmarshalledToken.exp > currentTime){
        return unmarshalledToken
      } else {
        return {"error": "token expired"}
      }
    } else {
      return {"error": "token invalid"}
    }
}

export function unmarshallToken(token){
  if(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var res = JSON.parse(window.atob(base64));
    return res;
  } else {
    return null
  }
}

export function generateFetchConfigCredentials(action, token, data) {
	let config;
  
	if(action === 'POST') {
	    config = 	{
				method: 'POST',
				headers: 	{
	        'Authorization': 'Bearer ' + token,
	        'Content-Type':'application/json'
	      },
				body: JSON.stringify(data)
	    }
  } else if( action === 'GET') {
	    config = 	{
				method: 'GET',
				headers: {
	        'Authorization': 'Bearer ' + token,
	        'Content-Type':'application/json'
	      }
	    }
	}

	return config;
}