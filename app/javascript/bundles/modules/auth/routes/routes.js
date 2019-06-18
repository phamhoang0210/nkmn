import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AuthContainer from '../containers/AuthContainer'
import AuthSignInContainer from '../containers/AuthSignInContainer'
import { PATH_CONFIG } from 'config/path'
// import {requireAuth} from 'helpers/auth/authHelper'
export default (
  <Route path={PATH_CONFIG} component={AuthContainer}>
    <IndexRoute component={AuthContainer}/>
    <Route path={PATH_CONFIG.signIn} component={AuthSignInContainer} />
  </Route>
)
