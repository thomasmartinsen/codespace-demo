import React, { useState, useEffect } from "react";
import App from "./App";
import { Route, Switch, Redirect } from 'react-router-dom'
import { authenticateViaGroup } from './utils/auth'
import { LoadingIcon, Unauthorized } from './index'
import NoClient from './components/parent/noClient'

const clientIdEnvVar = process.env.REACT_APP_DEFAULT_CLIENT_ID

const AuthApp = (props) => {
  const [authenticated, setAuthenticated] = useState(null)
  const { logout } = props

  const furtherAuthentication = () => {
    authenticateViaGroup().then(x => {
      setAuthenticated(true)
    }).catch(err => {
      setAuthenticated(false)
    })
  }
  
  useEffect(() => {
    furtherAuthentication()
  }, []);

  const defaultClientId = clientIdEnvVar ? clientIdEnvVar.length > 0 ? clientIdEnvVar : null : null

  if(authenticated) {
    return (
      <>
        {defaultClientId ? 
          <Switch>
            <Route path={''} render={(props) => <App defaultClientId={defaultClientId} {...props} />}/> 
          </Switch>
          :
          <Switch>
            <Route path={'/'} exact render={() => <NoClient />} />
            <Route path={'/:clientId'} render={(props) => <App {...props} />}/>
          </Switch>
        }
      </>
    )
  } else if(authenticated === false) {
    return <Unauthorized />
  } else {
    return <LoadingIcon />
  }
  
}

export default AuthApp;