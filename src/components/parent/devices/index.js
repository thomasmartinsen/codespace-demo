import React, { useEffect } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useStore } from 'react-redux'
import moment from 'moment'
import { connect } from 'react-redux';
import { 
    makeStyles,
    CircularProgress
} from '@material-ui/core';
import { getDevices } from '../../../actions/devices'
import { getDeviceGroups } from '../../../actions/deviceGroups'
import SensorOverview from './components/sensor-overview'
import { push } from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(8, 17.5),
        flexGrow:1,
        display:'flex',
        flexDirection:'column'
    }
}))

const mapStateToProps = state => {
	return {
        devices:state.devices,
        deviceGroups:state.deviceGroups,
        client:state.client
	};
};

const App = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const { client, push, location, match, devices, getDevices } = props
    moment.locale('da')

    useEffect(() => {
        if(!devices) {
            getDevices()
        }
    }, [devices, getDevices])

    return (
        <div className={classes.content}>
            {devices ? 
                <SensorOverview 
                    push={push}
                    sensors={devices.filter(x => x.isActive)}
                    client={client}
                />
                :<CircularProgress />
            }
        </div>
    )
  }

export default connect(mapStateToProps, { getDevices, push })(withRouter(App));


