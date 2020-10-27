import React, { useEffect, useState } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useStore } from 'react-redux'
import moment from 'moment'
import { connect } from 'react-redux';
import { 
    makeStyles,
    CircularProgress
} from '@material-ui/core';
import { getDevices } from '../../../actions/devices'
import { getRules } from '../../../actions/rules'
import { getDeviceGroups } from '../../../actions/deviceGroups'
import DeviceDetails from './components/DeviceDetails'
import { push } from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
    loading: {
        transform:'translate(-50%, -50%)',
        position:'absolute',
        top:'50%',
        left:'50%'
    }
}))

const mapStateToProps = state => {
	return {
        devices:state.devices,
        rules:state.rules,
        deviceGroups:state.deviceGroups,
        client:state.client
	};
};

const App = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const [device, setDevice] = useState(null)
    const { push, client, location, match, devices, getDevices, rules, getRules, deviceGroups, getDeviceGroups } = props
    moment.locale('da')

    useEffect(() => {
        if(!devices) {
            getDevices()
        }
    }, [devices, getDevices])

    useEffect(() => {
        if(!rules) {
            getRules()
        }
    }, [rules, getRules])

    useEffect(() => {
        if(!deviceGroups) {
            getDeviceGroups()
        }
    }, [deviceGroups, getDeviceGroups])

    useEffect(() => {
        if(devices) {
            const newDevice = devices.find(x => x.deviceId === match.params.id)
            if(newDevice) {
                setDevice(newDevice)
            } 
            else {
                push(`${client.defaultPath}/home`)
            }
        }
    }, [devices, match.params.id, push, client.defaultPath])

    return (
        <>
            {device && rules && deviceGroups ? 
                <DeviceDetails 
                    client={client}
                    push={push}
                    allSensors={devices}
                    sensor={device}
                    rules={rules}
                    deviceGroups={deviceGroups}
                />
                :
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            }
        </>
    )
  }

export default connect(mapStateToProps, { getDevices, getRules, getDeviceGroups, push })(withRouter(App));


