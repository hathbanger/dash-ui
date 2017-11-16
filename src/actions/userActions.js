import {generateFetchConfigCredentials} from 'utility/utilityFunctions'
import {retrieveOrganization} from 'actions/organizationActions'

export const USER_RETRIEVE_SUCCESS = 'USER_RETRIEVE_SUCCESS'


function receiveUser(data) {
  return {
    type: USER_RETRIEVE_SUCCESS,
    user: data
  }
}

export function createUser(creds) {
  let config =  {
    method: 'POST',
    headers:  {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(creds)
  }
  return dispatch => {
    // dispatch(requestLogin(creds))
    return fetch("http://localhost:1323/user", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
          if(data.token){
            localStorage.setItem("id_token", data.token)
            dispatch(receiveUser())
            window.location.href = "/dashboard"
          }
      });
  }
}

export function retrieveUser() {
  let token = localStorage.getItem('id_token');
  let config = generateFetchConfigCredentials("GET", token)
  return dispatch => {
    return fetch("http://localhost:1323/user", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
          dispatch(receiveUser(data))
          if(data.organization){
            dispatch(retrieveOrganization(data.organization))
          }
      });
  }
}


