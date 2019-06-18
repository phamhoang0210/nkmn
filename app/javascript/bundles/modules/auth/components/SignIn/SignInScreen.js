import React from 'react'
import _ from 'lodash'
import SignInForm from './SignInForm'
import { Alert } from 'antd'

class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {authSignInState} = this.props
    const alert = authSignInState.get('alert')

    return (
      <div className="login-form">
        <div className="login-form-logo">
          <img alt="Appcode logo"src="/assets/site-icon.png" />
          <b>LOGIN</b>
        </div>
        <SignInForm {...this.props}/>
      </div>
    )
  }
}

export default SignInScreen
