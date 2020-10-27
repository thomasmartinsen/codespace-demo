// authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
// Msal Configurations
const config = {
  auth: {
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AUTH_TENANT}`,
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
    redirectUri:window.location.origin
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};
 
// Authentication Parameters
export const authenticationParameters = {
  scopes: [
    'User.Read',
    'Directory.Read.All',
    'https://management.core.windows.net/user_impersonation',
  ]
}
 
// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin + '/auth.html'
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)