import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useStore } from 'react-redux'
import moment from 'moment'
import { 
    makeStyles
} from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Devices from './pages/devices/Devices'
import Device from './pages/devices/Device'

import DeviceGroups from './pages/deviceGroups/DeviceGroups'
import DeviceGroup from './pages/deviceGroups/DeviceGroup'

import Users from './pages/users/Users'
import User from './pages/users/User'

import Rules from './pages/rules/Rules'
import Rule from './pages/rules/Rule'

import Navigation from './Navigation'
import StatusSnackbar from '../../sub/block/StatusSnackbar'

const useStyles = makeStyles((theme) => ({

}))

const mapStateToProps = state => {
	return {
        client:state.client
	};
};


const App = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const { client, location, match } = props
    moment.locale('da')
    return (
        <>
            <StatusSnackbar />
            <Switch>
                <Route exact path={`${client.defaultPath}/settings`}>
                    <Redirect to={`${client.defaultPath}/settings/devices`}/>
                </Route>

                {/* devices */}
                <Route path={`${client.defaultPath}/settings/devices`} exact render={(props) => <Devices {...props} />} />
                <Route path={`${client.defaultPath}/settings/devices/create`} exact render={(props) => <Device {...props} creating={true} />} />
                <Route path={`${client.defaultPath}/settings/devices/:id`} exact render={(props) => <Device {...props} creating={false} />} />

                {/* device groups */}
                <Route path={`${client.defaultPath}/settings/device-groups`} exact render={(props) => <DeviceGroups {...props} />} />
                <Route path={`${client.defaultPath}/settings/device-groups/create`} exact render={(props) => <DeviceGroup {...props} creating={true} />} />
                <Route path={`${client.defaultPath}/settings/device-groups/:id`} exact render={(props) => <DeviceGroup {...props} creating={false} />} />

                {/* users */}
                <Route path={`${client.defaultPath}/settings/users`} exact render={(props) => <Users {...props} />} />
                <Route path={`${client.defaultPath}/settings/users/create`} exact render={(props) => <User {...props} creating={true} />} />
                <Route path={`${client.defaultPath}/settings/users/:id`} exact render={(props) => <User {...props} creating={false} />} />

                {/* rules */}
                <Route path={`${client.defaultPath}/settings/rules`} exact render={(props) => <Rules {...props} />} />
                <Route path={`${client.defaultPath}/settings/rules/create`} exact render={(props) => <Rule {...props} creating={true} />} />
                <Route path={`${client.defaultPath}/settings/rules/:id`} exact render={(props) => <Rule {...props} creating={false} />} />
            </Switch>
        </>
    )
  }

export default connect(mapStateToProps, null)(withRouter(App));


