import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AuthApp from "./indexApp";
import './fonts/index.css'
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from "./styles/theme";
import { history, configureStore } from './store'
import { ConnectedRouter } from 'connected-react-router'
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from './utils/msalConfig';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment'
import "moment/locale/da"

export const store = configureStore()

export const LoadingIcon = () => {
  return(
    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
      <CircularProgress />
    </div>
  )
}


export const Unauthorized = () => {
  return(
    "Unauthorized"
  )
}

moment.locale("da");

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
          <AzureAD provider={authProvider} forceLogin={true} reduxStore={store}>
            {
              ({login, logout, authenticationState, error, accountInfo}) => {
                switch (authenticationState) {
                  case AuthenticationState.Authenticated:
                    return <AuthApp logout={logout}/>
                  case AuthenticationState.Unauthenticated:
                    return <Unauthorized />
                  case AuthenticationState.InProgress:
                    return <LoadingIcon />
                  default:
                    //nothing
                }
              }
            }
          </AzureAD>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
, document.getElementById("root"));

