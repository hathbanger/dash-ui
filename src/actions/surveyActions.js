import {unmarshallToken} from 'utility/utilityFunctions'

export const SURVEYS_RETRIEVE_SUCCESS = 'SURVEYS_RETRIEVE_SUCCESS'


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
    return fetch("http://localhost:1323/" + organization.id +"/get-surveys", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {        
          console.log("SURVEY DATA", data)           
            dispatch(receiveSurveys(data))
      });
  }
}



