import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	Typography,
} from '@material-ui/core';
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import cx from 'classnames';
import moment from 'moment';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { renderMeasurementIcon } from '../../../utils/measurementTypes'

const styles = theme => ({
	root: {
        height:'100%',
        width:'100%',
        position:'relative',
        borderRadius:theme.spacing(1),
        color:theme.palette.common.white
    },
    rootContent: {
        padding: theme.spacing(4),
        height: `calc(100% - ${theme.spacing(8)}px)`,
    },
    topDetails: {
        height:'50%'
    },
    bottomDetails: {
        height:'50%'
    },
    textContainer: {
        float:'left',
        display:'inline-block',
        width: 'calc(100% - 125px)'
    },
    measurementContainer: {
        display:'inline-block',
        position:'absolute',
        padding:theme.spacing(0.5),
        top: theme.spacing(4),
        right: theme.spacing(4),
    },
    graphContainer: {
        height:'calc(100% - 16px)',
        width:'100%',
    },
    link: {
        position:'absolute',
        bottom:13,
        right:14,
        cursor:'pointer'
    },
    popupSubtext: {
        fontSize:theme.typography.pxToRem(14),
        margin:0,
        padding:0,
        lineHeight:1.35,
        fontWeight:300,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.white,
    },
    popupText:{
        fontSize:theme.typography.pxToRem(24),
        fontWeight:500,
        padding:0,
        margin:`0 0 ${theme.spacing(1)}px 0`,
        lineHeight:1,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.white,
        flexWrap: 'nowrap',
        textOverflow: 'ellipsis',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    measurementText: {
        fontSize:theme.typography.pxToRem(44),
        fontWeight:300,
        padding:0,
        margin:0,
        lineHeight:0.45,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.white
    },
    measurementIcon: {
        height:36,
        width:36,
        '& path': {
            fill: theme.palette.common.white
        },
        verticalAlign:'bottom',
        marginBottom:1
    },
    inline: {
        display:'inline-block'
    },
    linkText: {
        fontSize:theme.typography.pxToRem(12),
        lineHeight:1.6,
        padding:0,
        margin:0,
        color:theme.palette.common.white,
        fontFamily:theme.typography.fontFamily,
        opacity: '0.8',
        fontWeight:500,
        textTransform:'uppercase'
    },
    linkArrowIcon: {
        height:18,
        width:18,
        verticalAlign:'bottom'
    }
});

const SensorDetailsComponent = (props) => {
    const dispatch = useDispatch()
    const [data, setData] = useState(null)

    const renderPrimaryMeasurementIcon = measurements => {
        //return <TemperatureIcon className={classes.icon} />
        let primaryMeasurement;
        if(measurements !== null) {
            measurements.forEach((measurement) => {
                if(measurement.isPrimary) {
                    primaryMeasurement = measurement
                }
            })
        }
        return renderMeasurementIcon(primaryMeasurement, cx(classes.measurementIcon, classes.inline))
    }

    const renderLatestMeasurement = measurements => {
        let primaryValue = "";
        if(measurements !== null) {
            measurements.forEach((measurement) => {
                if(measurement.isPrimary) {
                    primaryValue = Math.round((measurement.value + Number.EPSILON) * 100) / 100
                }
            })
        } else {
            return '-'
        }
        return primaryValue
    }
    
    const renderTimestamp = (lastUpdated) => {
        if(lastUpdated) {
            return ('Seneste måling er for ' + (lastUpdated ? moment().diff(lastUpdated, 'days') >= 1 ? moment.utc(lastUpdated).local().fromNow() : moment.utc(lastUpdated).local().fromNow() : '-'))
        } else {
            return "Ingen data"
        }
    }
    
    const seeAllSensors = () => {
        push(`${client.defaultPath}/devices`)
    }

    useEffect(() => {
        const parseMeasurementDataShortened = sensorData => {
            var parsedData = [];
            const copyOfSensorData = [...props.sensorData]
            copyOfSensorData.forEach((item, index) => {
              if(item.isPrimary) {
                const placeInCurrentData = parsedData.findIndex(x => x.time === item.measuredAt)
                if(placeInCurrentData !== -1) {
                  parsedData[placeInCurrentData] = {
                      ...parsedData[placeInCurrentData],
                      [item.measurementType.toUpperCase()]:item.value,
                  }
                } else {
                  parsedData.push({
                    time:item.measuredAt, 
                    [item.measurementType.toUpperCase()]:item.value
                  })
                }
              }
            })
            return parsedData.slice(-10)
        };
        if(props.sensorData) {
            setData(parseMeasurementDataShortened(props.sensorData))
        }
    }, [props.sensorData]);


    const { classes, sensor, groups, push, client } = props;
    const { deviceType, deviceId, description, measurements, lastUpdated, deviceGroupId } = sensor;
    return (
        <>
            <div className={classes.root} style={{backgroundColor: sensor.atttributes ? sensor.attributes.iconColor : '#000000'}}>
                <div className={classes.rootContent}>
                    <div className={classes.topDetails}>
                        <div className={classes.textContainer}>
                            <Typography className={classes.popupSubtext}>{deviceId + ' - ' + deviceType}</Typography>
                            <Typography className={classes.popupText}>{description}</Typography>
                            <Typography className={classes.popupSubtext}>{measurements ? renderTimestamp(lastUpdated) : "Ingen data"}</Typography>
                        </div>
                        <div className={classes.measurementContainer}>
                            {renderPrimaryMeasurementIcon(measurements)}
                            <Typography className={cx(classes.measurementText, classes.inline)}>{renderLatestMeasurement(measurements)}</Typography>
                        </div>
                    </div>
                    <div className={classes.bottomDetails}>
                        <div className={classes.graphContainer}>
                            {data &&
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <Line type="monotone" dataKey="TEMPERATURE_C" stroke="#fff" dots={{ fill: '#fff', r: 3 }} strokeWidth={1} />
                                    </LineChart>
                                </ResponsiveContainer>
                            }
                        </div>
                    </div>
                    <div className={classes.link}>
                        <Typography className={classes.linkText} onClick={seeAllSensors}>Se alle {groups && deviceGroupId ? groups.find(x => x.id === deviceGroupId).name : "sensorer"}<ChevronRightIcon className={classes.linkArrowIcon} /></Typography>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withStyles(styles)(SensorDetailsComponent);
