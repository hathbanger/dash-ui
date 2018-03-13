import {unmarshallToken} from 'utility/utilityFunctions'

export const TEAMS_RETRIEVE_SUCCESS = 'TEAMS_RETRIEVE_SUCCESS'

const goApi = window.location.hostname == "localhost" ? "http://localhost:1323/api" : "http://104.155.147.15/api";


function receiveTeams(data) {
  return {
    type: TEAMS_RETRIEVE_SUCCESS,
    teams: data
  }
}


export function retrieveTeams(organization) {
  let token = localStorage.getItem('id_token');

  let config =  {
      method: 'GET',
  }   
  let userTokenData = unmarshallToken(token);
  return dispatch => {
    return fetch(goApi + "/" + organization +"/teams", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {        
            if(data){
              dispatch(receiveTeams(data))
            }        
      });
  }
}


export function createTeam(creds) {
  let config =  {
    method: 'POST',
    headers:  {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(creds)
  }
  return dispatch => {
    // dispatch(requestLogin(creds))
    return fetch(goApi + "/team", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
          // dispatch(receiveTeams())
          console.log("DATA FROM CREATE TEAMS",data)
      });
  }
}

