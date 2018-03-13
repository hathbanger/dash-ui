import {unmarshallToken} from 'utility/utilityFunctions'
import {retrieveSurveys} from 'actions/surveyActions'
import {retrieveTeams} from 'actions/teamActions'
import {retrieveCampaigns} from 'actions/campaignActions'

export const ORG_RETRIEVE_SUCCESS = 'ORG_RETRIEVE_SUCCESS'

const goApi = window.location.hostname == "localhost" ? "http://localhost:1323/api/" : "http://104.155.147.15/api/";

function receiveOrganization(data) {
  return {
    type: ORG_RETRIEVE_SUCCESS,
    organization: data
  }
}

export function createOrganization(creds) {
  let token = localStorage.getItem('id_token');
  let config =  {
    method: 'POST',
    headers:  {
      'Authorization': 'Bearer ' + token,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    // dispatch(requestLogin(creds))
    return fetch(goApi + "organization", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
          dispatch(receiveOrganization(data))
          console.log("returned data",data)
      });
  }
}

export function retrieveOrganization(organizationId) {
  let token = localStorage.getItem('id_token');
  let config =  {
    method: 'GET',
    headers:  {
      'Authorization': 'Bearer ' + token,
    }
  }
  let userTokenData = unmarshallToken(token);
  return dispatch => {
    return fetch(goApi + organizationId, config)
    .then((response) => {
        return response.json();
      }).then((data) => {
          dispatch(receiveOrganization(data))
          dispatch(retrieveTeams(organizationId))
          dispatch(retrieveCampaigns(organizationId))
          dispatch(retrieveSurveys(data))
      });
  }
}



