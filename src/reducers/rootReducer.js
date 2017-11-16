import { combineReducers } from 'redux'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  AUTHENTICATE_SUCCESS,
} from '../actions/authActions'

import {
  USER_RETRIEVE_SUCCESS,
} from '../actions/userActions'

import {
  ORG_RETRIEVE_SUCCESS,
} from '../actions/organizationActions'

import {
  SURVEYS_RETRIEVE_SUCCESS,
} from '../actions/surveyActions'

let newState = {
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    thisTest: true,
    user: null,
    organization: null,
    surveys: [],
  };


function auth(state = newState, action) {
  switch (action.type) {
    case USER_RETRIEVE_SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      })
    case SURVEYS_RETRIEVE_SUCCESS:
      return Object.assign({}, state, {
        surveys: action.surveys
      })
    case ORG_RETRIEVE_SUCCESS:
      return Object.assign({}, state, {
        organization: action.organization
      })
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: false
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.user,
        errorMessage: ''
      })
    case AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      })  	
    default:
      return state
    }
}


const rootReducer = combineReducers({
  auth,
})

export default rootReducer
