import {unmarshallToken} from 'utility/utilityFunctions'
import {retrieveSurveys} from 'actions/surveyActions'

export const ORG_RETRIEVE_SUCCESS = 'ORG_RETRIEVE_SUCCESS'

const goApi = window.location.hostname == "localhost" ? "http://localhost:1323" : "http://104.236.198.6/api";

function receiveOrganization(data) {
  return {
    type: ORG_RETRIEVE_SUCCESS,
    organization: data
  }
}


export function retrieveOrganization(organizationId) {
  console.log("RETRIEV ORG")
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
          dispatch(retrieveSurveys(data))
      });
  }
}



