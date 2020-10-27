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
import GoogleMaps from '../../sub/block/GoogleMaps'
import { push } from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
    loading: {
        transform:'translate(-50%, -50%)',
        position:'absolute',
        top:'50%',
        left:'50%'
    }
}))

const mapStateToProps = state => ({
    devices:state.devices,
    client:state.client
})

const App = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const { push, client, location, match, devices, getDevices } = props
    moment.locale('da')

    useEffect(() => {
        if(!devices) {
            getDevices()
        }
    }, [devices, getDevices])

    return (
        <>
            {devices ? 
                <GoogleMaps 
                    client={client}
                    push={push}
                    fullScreen={true}
                    allSensors={devices}
                    sensors={devices.filter(x => x.isActive)}
                    selectedSensor={null}
                    isMapLoading={Boolean(!devices)}
                />
                :
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            }
        </>
    )
  }

export default connect(mapStateToProps, { getDevices, push })(withRouter(App));


