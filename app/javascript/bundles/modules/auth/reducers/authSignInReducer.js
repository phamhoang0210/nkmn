import Immutable from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { parseError } from 'helpers/applicationHelper'
export const initialState = Immutable.fromJS({
  alert: null,
  isSignin: false,
})

export default function authSignInReducer($$state = initialState, action = null) {
  const { type, records, filters, error } = action

  switch (type) {
    case actionTypes.SET_IS_SIGNIN: {
      return $$state.merge({
        isSignin: true,
        alert: null,
      })
    }

    case actionTypes.SIGNIN_SUCCESS: {
      return $$state.merge({
        isSignin: false,
        alert: null,
      })
    }

    case actionTypes.SIGNIN_FAILSE: {
      return $$state.merge({
        isSignin: false,
        alert: parseError(error),
      })
    }

    default: {
      return $$state
    }
  }
}
