import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	Typography,
} from '@material-ui/core';
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import cx from 'classnames';
import moment from 'moment';
import { renderMeasurementUnit, renderMeasurementTitle, renderMeasurementIcon } from '../../../utils/measurementTypes'

const styles = theme => ({
	root: {
        //-2px for border
        height:'calc(100% - 2px)',
        width:'calc(100% - 2px)',
        position:'relative',
        borderRadius:theme.spacing(1),
        border:`1px solid ${theme.palette.common.lines}`
    },
    rootContent: {
        padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(4.5)}px`,
        height: `calc(100% - ${theme.spacing(6)}px)`
    },
    topDetails: {
        height:'40%'
    },
    bottomDetails: {
        height:'60%',
        position:'relative',
        overflowY:'auto',
        '&::-webkit-scrollbar': {
            '-webkit-appearance': 'none',
            width: 7
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,.2)',
            '-webkit-box-shadow': '0 0 1px rgba(255,255,255,.5)',
        }
    },
    titleContainer: {
        float:'left',
        display:'inline-block'
    },
    rightTextContainer: {
        float:'right',
        display:'inline-block'
    },
    rightText: {
        fontSize:theme.typography.pxToRem(14),
        fontWeight:300,
        padding:0,
        margin:0,
        lineHeight:1.3,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.controls.menuIcon,
    },
    measurementsContainer: {
        paddingLeft:theme.spacing(0.5),
        
    },
    measurementContainer: {
        display:'inline-block',
        paddingRight:theme.spacing(14),
        paddingBottom:theme.spacing(2)
    },
    graphContainer: {

    },
    link: {
        position:'absolute',
        bottom:13,
        right:14,
        cursor:'pointer'
    },
    titleText:{
        fontSize:theme.typography.pxToRem(17),
        fontWeight:500,
        padding:0,
        margin:`0 0 ${theme.spacing(1)}px 0`,
        lineHeight:1.3,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.defaultText,
        textTransform:'uppercase'
    },
    measurementTitle: {
        fontSize:theme.typography.pxToRem(13),
        fontWeight:300,
        padding:0,
        margin:0,
        lineHeight:1.3,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.controls.menuIcon,
    },
    measurementText: {
        fontSize:theme.typography.pxToRem(36),
        fontWeight:300,
        padding:0,
        margin:0,
        lineHeight:1.2,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.defaultText
    },
    measurementIcon: {
        height:30,
        width:30,
        '& path': {
            fill: theme.palette.common.defaultText
        },
        verticalAlign:'bottom',
        marginBottom:4
    },
    inline: {
        display:'inline-block'
    },
    linkText: {
        fontSize:theme.typography.pxToRem(12),
        lineHeight:1.6,
        padding:0,
        margin:0,
        color:theme.palette.common.defaultText,
        fontFamily:theme.typography.fontFamily,
        opacity: '0.8',
        fontWeight:500,
        textTransform:'uppercase'
    },
    linkArrowIcon: {
        height:18,
        width:18,
        verticalAlign:'bottom'
    },
    batteryIcon: {
        transform:'rotate(-90deg)'
    }
});

const LatestMeasurementsComponent = (props) => {
    const [stateMeasurements, setStateMeasurements] = useState(null)
    const { classes, sensor } = props;
    const { measurements, lastUpdated } = sensor;
    
    const renderMeasurementValue = (measurement) => {
        if(measurement) {
            if(measurement.measurementType === 'RISK') {
                switch(measurement.value) {
                    case 1: return "Ingen risiko"
                    case 2: return "Risiko"
                    case 3: return "Høj risiko"
                    default: return '-'
                }
            } else if(measurement.measurementType === 'BATTERY_PCT') {
                return Math.round(measurement.value) + renderMeasurementUnit(measurement.measurementType)
            } else {
                return `${Math.round((measurement.value + Number.EPSILON) * 100) / 100}${renderMeasurementUnit(measurement.measurementType)}`
            }
        } else {
            return '-'
        }
    }

    useEffect(() => {
        //move battery measurement to end
        if(measurements) {
            if(measurements.filter(x => x.measurementType === "BATTERY_PCT").length > 0) {
                let newMeasurements = [...measurements]
                newMeasurements.push(newMeasurements.splice(newMeasurements.findIndex(x => x.measurementType === 'BATTERY_PCT'), 1)[0])
                setStateMeasurements(newMeasurements)
            } else {
                setStateMeasurements(measurements)
            }
        } else {
            setStateMeasurements(null)
        }
        
    }, [measurements])

    
    
    const renderTimestamp = (lastUpdated) => {
            return ('Måling: ' + (lastUpdated ? moment.utc(lastUpdated).local().format("DD/MM/YY - HH:mm") : 'Ingen data'))
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.rootContent}>
                    <div className={classes.topDetails}>
                        <div className={classes.titleContainer}>
                            <Typography className={classes.titleText}>Seneste data</Typography>
                        </div>
                        <div className={classes.rightTextContainer}>
                            <Typography className={classes.rightText}>{renderTimestamp(lastUpdated)}</Typography>
                        </div>
                    </div>
                    
                    <div className={classes.bottomDetails}>
                        <div className={classes.measurementsContainer}>
                            {stateMeasurements ?
                            
                                stateMeasurements.map((measurement, index) => {
                                    return(
                                    <div className={classes.measurementContainer} key={index}>
                                        <Typography className={classes.measurementTitle}>{renderMeasurementTitle(measurement.measurementType) + (renderMeasurementUnit(measurement.measurementType) !== '' ? ` (${renderMeasurementUnit(measurement.measurementType)})` : '')}</Typography>
                                        {renderMeasurementIcon(measurement, cx(classes.measurementIcon, classes.inline))}
                                    <Typography className={cx(classes.measurementText, classes.inline)}>{renderMeasurementValue(measurement)}</Typography>
                                    </div>)
                                })
                            :
                            <div className={classes.measurementContainer}>
                                <Typography className={classes.measurementTitle}>Ingen data</Typography>
                                <Typography className={cx(classes.measurementText, classes.inline)}>-</Typography>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withStyles(styles)(LatestMeasurementsComponent);
