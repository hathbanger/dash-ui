import {generateFetchConfigCredentials} from 'utility/utilityFunctions'
import {retrieveOrganization} from 'actions/organizationActions'

export const CAMPAIGNS_RETRIEVE_SUCCESS = 'CAMPAIGNS_RETRIEVE_SUCCESS'

const goApi = window.location.hostname == "localhost" ? "http://localhost:1323/api" : "http://104.155.147.15:1323/api";


function receiveCampaigns(data) {
  return {
    type: CAMPAIGNS_RETRIEVE_SUCCESS,
    campaigns: data
  }
}

export function createCampaign(creds) {
  let config =  {
    method: 'POST',
    headers:  {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    // dispatch(requestLogin(creds))
    return fetch(goApi + "/campaign", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
        console.log('creds',creds)
        dispatch(retrieveCampaigns(creds.organizationId))
            // dispatch(receiveCampaign())
      });
  }
}
export function startCampaign(organizationId, campaignId) {
  let config =  {
    method: 'GET',
    // headers:  {
    //   'Content-Type':'application/json'
    // },
    // body: JSON.stringify(creds)
  }

  return dispatch => {
    // dispatch(requestLogin(creds))
    return fetch(goApi + "/" + organizationId + "/" + campaignId, config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
            console.log("DATA FROM CAMPAIGN START", data)
            // dispatch(receiveCampaigns([data]))
            dispatch(retrieveCampaigns(organizationId))
      });
  }
}

export function retrieveCampaigns(organizationId) {
  let token = localStorage.getItem('id_token');
  let config = generateFetchConfigCredentials("GET", token)

  return dispatch => {
    return fetch(goApi + "/" + organizationId + "/get-campaigns", config)
    .then((response) => { 
        return response.json();
      }).then((data) => {
        console.log("ORGAID",data)
          dispatch(receiveCampaigns(data))
      });
  }
}



