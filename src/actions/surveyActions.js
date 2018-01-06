import {unmarshallToken} from 'utility/utilityFunctions'

export const SURVEYS_RETRIEVE_SUCCESS = 'SURVEYS_RETRIEVE_SUCCESS'

const goApi = window.location.hostname == "localhost" ? "http://localhost:1323/api" : "http://104.236.198.6/api";


function receiveSurveys(data) {
  return {
    type: SURVEYS_RETRIEVE_SUCCESS,
    surveys: data
  }
}


export function retrieveSurveys(organization) {
  let token = localStorage.getItem('id_token');
  let messageTime = new Date();
  let config =  {
      method: 'GET',
  }   
  let userTokenData = unmarshallToken(token);
  return dispatch => {
    return fetch(goApi + "/" + organization.id +"/get-surveys", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {        
            dispatch(receiveSurveys(data))
      });
  }
}



