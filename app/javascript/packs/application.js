import ReactOnRails from 'react-on-rails'

import AuthApp from 'modules/auth/registers/AuthApp'

// This is how react_on_rails can see the AppAuth in the browser.
ReactOnRails.register({
  AppAuth,
});
