import {generateFetchConfigCredentials} from 'utility/utilityFunctions'
import {retrieveOrganization, createOrganization} from 'actions/organizationActions'
import {unmarshallToken} from 'actions/authActions'

export const USER_RETRIEVE_SUCCESS = 'USER_RETRIEVE_SUCCESS'

const goApi = window.location.hostname == "localhost" ? "http://localhost:1323/api" : "http://104.155.147.15:1323/api";


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
    return fetch(goApi + "/user", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
          if(data.token){
            localStorage.setItem("id_token", data.token)
            dispatch(receiveUser())
            let user = unmarshallToken(data.token)
            console.log("USER",user)
            dispatch(createOrganization({"organizationName": creds.organizationName, "userId":user.id}))
            window.location.href = "/dashboard"
          }
      });
  }
}

export function retrieveUser() {
  let token = localStorage.getItem('id_token');
  let config = generateFetchConfigCredentials("GET", token)
  return dispatch => {
    return fetch(goApi + "/user", config)
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


