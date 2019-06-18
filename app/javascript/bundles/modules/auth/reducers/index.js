import authReducer, { initialState as authState } from './authReducer'
import authSignInReducer, { initialState as authSignInState } from './authSignInReducer'

export default {
  authState: authReducer,
  authSignInState: authSignInReducer,
  // authSignUpState: authSignUpReducer,
  // authSignOutState: authSignOutReducer,
}

export const initialStates = {
  authState,
  authSignInState,
  // authSignUpState,
  // authSignOutState,
}
