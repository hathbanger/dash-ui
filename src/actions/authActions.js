export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'

const goApi = window.location.hostname == "localhost" ? "http://localhost:1323/api" : "http://104.155.147.15:1323/api";

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    tokenCode: creds
  }
}

function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


function authenticateUser() {
  return {
    type: AUTHENTICATE_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}



export function loginUser(creds) {
  let config =  {
    method: 'POST',
    headers:  {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(creds)
  }
  return dispatch => {
    dispatch(requestLogin(creds))
    return fetch(goApi + "/login", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
          if(data.token){
            localStorage.setItem("id_token", data.token)
            // dispatch(retrieveUser())
            dispatch(receiveLogin())
            window.location.href = "/dashboard"
          } else {
            dispatch(loginError("error"))
          }
      });
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage
    .removeItem('id_token')      
    dispatch(receiveLogout())
    window.location.href = "/auth/login-page"
  }
}


export function validateToken(token){
  return dispatch => {
    var currentTime = Math.floor(new Date().getTime()/1000)
    var unmarshalledToken = unmarshallToken(token);
    if(unmarshalledToken && unmarshalledToken.exp > currentTime){
      dispatch(authenticateUser())
      return true
    } else {
      return false
    }
  }
}

export function unmarshallToken(token){
  if(token){
    var base64Url = token.split('.')[1];
    
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var res = JSON.parse(window.atob(base64));
    return res;
  } else {
    return false
  }
}


