import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withStyles, Grid } from '@material-ui/core';
import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/da';
import GoogleMaps from '../../../sub/block/GoogleMaps';
import Api from '../../../../api'
import NotificationComponent from '../../../sub/block/Notification'
import SensorDetailsComponent from '../../../sub/block/SensorDetails'
import LatestMeasurementsComponent from '../../../sub/block/LatestMeasurements'
import RulesComponent from '../../../sub/block/Rules';
import GraphComponent from '../../../sub/block/Graph';

const styles = theme => ({
    root: {
        top: 0,
        left: 65,
        height: `calc(100vh - ${theme.spacing(16)}px)`,
        width: `100%`,
        overflowY: 'auto',
        padding:theme.spacing(4)
    },
    fullHeight: {
        height:'100%'
    },
    topContainerLeft: {
        padding:`0 ${theme.spacing(1.5)}px 0 0`,
        [theme.breakpoints.down('md')]: {
            padding:`0 0 ${theme.spacing(1.5)}px 0`
        }
    },
    topContainerRight: {
        padding:`0 0 0 ${theme.spacing(1.5)}px`,
        [theme.breakpoints.down('md')]: {
            padding:`${theme.spacing(1.5)}px 0 0 0`,
            order:3,
        }
    },
    topContainerRightInner: {
        height:484 + theme.spacing(6),
    },
    topRow: {
        height:160 + theme.spacing(3)
    },
    midRow: {
        height:140 + theme.spacing(3)
    },
    bottomRow:{
        height:172 + theme.spacing(3)
    },
    bottomContainer: {
        [theme.breakpoints.down('md')]: {
            order:2,
            height:'auto',
            minHeight:'auto'
        },
        height:`calc(calc(100% - 472px) - ${theme.spacing(6)}px)`,
        minHeight:350
    },

})

class SensorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorData:null,
            sensorPredictions:null
        }
        moment.locale('da')
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        this.setState({ isLoadingData: true, showAllData: false, sensorData: null, sensorPredictions: null,  })
        this.fetchData(this.props.sensor)
    }
    
    fetchData = (sensor) => {
        Api.getDeviceMeasurements(sensor.deviceId).then(res => {
            if(sensor.showForecasts) {
                Api.getSensorPredictions(sensor.id).then(forecastRes => {
                    this.setState({ 
                        sensorData: Array.isArray(res.data) ?  _.orderBy(res.data, 'measuredAt', ['asc']) : [],  
                        sensorPredictions: Array.isArray(forecastRes.data) ? forecastRes.data : [], 
                        isLoadingData: false 
                    })
                })
            } else {
                this.setState({
                    sensorData: Array.isArray(res.data) ?  _.orderBy(res.data, 'measuredAt', ['asc']) : [], 
                    sensorPredictions: [],
                    isLoadingData: false, 
                })
            }
        })
    }
    
    render() {
        
        const { 
            classes, 
            sensor,
            deviceGroups,
            allSensors,
            rules,
            push,
            client,
            match
        } = this.props;
        const {
            sensorData,
            sensorPredictions
        } = this.state
        return (
                <Grid className={classes.root} container spacing={0}>
                    <Grid className={classes.topContainerLeft} item sm={12} md={12} lg={6}>
                        {sensor && 
                            <Grid container spacing={3} >
                                <Grid className={classes.topRow} item xs={8}>
                                    <SensorDetailsComponent sensor={sensor} sensorData={sensorData} groups={deviceGroups} client={client} push={push} />
                                </Grid>
                                <Grid className={classes.topRow} item xs={4}>
                                    <NotificationComponent notification={sensor.primaryNotification} latestMeasurements={sensor.measurements}/>
                                </Grid>
                                <Grid className={classes.midRow} item xs={12}>
                                    <LatestMeasurementsComponent sensor={sensor} />
                                </Grid>
                                <Grid className={classes.bottomRow} item xs={12}>
                                    <RulesComponent rules={rules} />
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    <Grid className={classes.topContainerRight} item xs={12} md={12} lg={6}>
                        <Grid container spacing={3} >
                            <Grid className={classes.topContainerRightInner} item xs={12}>
                                <GoogleMaps 
                                    client={client}
                                    push={push}
                                    fullScreen={false}
                                    allSensors={allSensors}
                                    selectedSensor={match.params.id}
                                    sensors={allSensors}
                                    isMapLoading={Boolean(!allSensors)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {sensor &&
                        <Grid className={classes.bottomContainer} item xs={12}>
                            <GraphComponent sensorData={sensorData} sensorForecastData={sensorPredictions} rules={rules}/>
                        </Grid>
                    }
                </Grid>
        )
    }
}



export default withStyles(styles)(withRouter(SensorDetails));