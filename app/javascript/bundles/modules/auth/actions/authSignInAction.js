import request from 'helpers/request'
import * as actionTypes from '../constants/actionTypes'
import * as authHelper from 'helpers/auth/authHelper'
import {
  APP_CODE_CONFIG
} from 'config/api'
function setIsSigning() {
  return {
    type: actionTypes.SET_IS_SIGNIN,
  }
}

function signInSuccess(data) {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
  }
}


function signInFailure(error) {
  return {
    type: actionTypes.SIGNIN_FAILSE,
    error,
  }
}

export function signIn(params = {}, onSuccess = null) {
  return dispatch => {
    dispatch(setIsSigning())
    return request
      .submitEntity(`${APP_CODE_CONFIG.baseUri}${APP_CODE_CONFIG.users}`, params)
      .then(res => {
        dispatch(signInSuccess(res.data))
        if(onSuccess) { onSuccess(res.data) }
      })
      .catch(error => dispatch(signInFailure(error)))
  }
}
