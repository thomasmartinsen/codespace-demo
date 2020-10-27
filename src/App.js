import React, { useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect, useDispatch, useStore } from 'react-redux'
import { 
  useTheme
} from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import { push } from 'connected-react-router'
import { setClientApi } from './api/config'

import config from './config.json'

import Profile from './components/parent/profile'
import DeviceDetails from './components/parent/details'
import Settings from './components/parent/settings'
import Devices from './components/parent/devices'
import Map from './components/parent/map'

import Navigation from './components/sub/navigation/Navigation'
import StatusSnackbar from './components/sub/block/StatusSnackbar'

import { setClient } from './actions/client'

const mapStateToProps = (state) => ({
  client:state.client,
});

const App = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []) 
  const { logout, match, client, defaultClientId } = props

  useEffect(() => {
    const clientId = defaultClientId ? defaultClientId : match.params.clientId;
    if(!client || client.clientId !== clientId) {
      setClientApi(clientId)
      stableDispatch(setClient(clientId, Boolean(defaultClientId)))
    }
  }, [client, match, defaultClientId, stableDispatch])

  return(
    <>
      {client &&
        <>
          <Helmet bodyAttributes={{style: `background-color: ${theme.palette.generalUi.background}; margin: 0`}}>
            <title>{config.appTitle}</title>
          </Helmet>
          <StatusSnackbar />
          <Navigation>
            <Switch>
              <Route path={`${client.defaultPath}/`} exact render={(props) => <Map {...props} /> } />
              <Route path={`${client.defaultPath}/devices`} render={(props) => <Devices {...props} /> } />                                                                                                                                                  
              <Route path={`${client.defaultPath}/settings`} render={(props) => <Settings {...props} /> }  />
              <Route path={`${client.defaultPath}/profile`} render={(props) => <Profile logout={logout} {...props} /> }  />
              <Route path={`${client.defaultPath}/device/:id`} render={(props) => <DeviceDetails {...props} />} />
            </Switch>
          </Navigation>
        </>
      }
    </>
  )
}

export default connect(mapStateToProps, null)(App);


