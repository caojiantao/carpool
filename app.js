import auth from './utils/auth'

// app.js
App({
  onLaunch() {
    auth.silentLogin();
  }
})