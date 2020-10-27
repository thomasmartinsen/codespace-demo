import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	Typography,
} from '@material-ui/core';
import moment from 'moment';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { renderMeasurementUnit, renderMeasurementTitle } from '../../../utils/measurementTypes'

const styles = theme => ({
	root: {
        height:'100%',
        width:'100%',
        position:'relative',
        borderRadius:theme.spacing(1),
        backgroundColor:theme.palette.primary.main
    },
    rootContent: {
        padding: theme.spacing(4),
        height:`calc(100% - ${theme.spacing(8)}px)`
    },
    details: {
        height:'100%',
        width:'100%',
        position:'relative'
    },
    textContainer: {
        height:'calc(100% - 22px)'
    },
    measurementContainer: {
        float:'right',
        display:'inline-block',
        position:'relative',
        padding:theme.spacing(0.5)
    },
    graphContainer: {

    },
    link: {
        position:'absolute',
        bottom:13,
        right:14,
        cursor:'pointer'
    },
    titleSubtext: {
        fontSize:theme.typography.pxToRem(14),
        margin:`0 0 ${theme.spacing(1)}px 0`,
        padding:0,
        lineHeight:1.35,
        fontWeight:300,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.white
    },
    titleText:{
        fontSize:theme.typography.pxToRem(24),
        fontWeight:500,
        padding:0,
        margin:`0 0 ${theme.spacing(1)}px 0`,
        lineHeight:1.1,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.white
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

const NotificationComponent = (props) => {
    const dispatch = useDispatch()
    
    const renderRuleThreshold = (rule) => {
        if(rule) {
            if(rule.measurementType === 'RISK') {
                switch(rule.threshold) {
                    case 1: return "Ingen risiko"
                    case 2: return "Risiko"
                    case 3: return "Høj risiko"
                    default: return '-'
                }
            } else if(rule.measurementType === 'BATTERY_PCT') {
                return Math.round(rule.threshold) + renderMeasurementUnit(rule.measurementType)
            } else if(rule.operation === 4) {
                return `${rule.threshold}${renderMeasurementUnit(rule.measurementType)} og ${rule.threshold2}${renderMeasurementUnit(rule.measurementType)}`
            } else {
                return `${rule.threshold}${renderMeasurementUnit(rule.measurementType)}`
            }
        } else {
            return '-'
        }
    }
    
    const renderTimestamp = () => {
        if(notification) {
            const { timestamp } = notification
            return ('Måling for ' + (timestamp ? moment().diff(timestamp, 'days') >= 1 ? moment.unix(timestamp).local().fromNow() : moment.unix(timestamp).local().fromNow() : '-'))
        } else {
            if(measurements) {
                if(measurements.length > 0) {
                    return ('Seneste måling er for ' + (measurements[0].time ? moment().diff(measurements[0].time, 'days') >= 1 ? moment.utc(measurements[0].time).local().fromNow() : moment.utc(measurements[0].time).local().fromNow() : '-'))
                }
            }
            return "Ingen data"
        }
    }

    const renderTitle = () => {
        if(notification) {
            const { rule, measurement } = notification;
            const { operation } = rule
            let operatorString;
            switch(operation) {
                case 1:
                    operatorString = " er over ";
                    break;
                case 2:
                    operatorString = " er under ";
                    break;
                case 3:
                    operatorString = " er ";
                    break;
                case 4:
                    operatorString = " er mellem ";
                    break;
                default:
                    //nothing
            }
            if(measurement.measurementType === "RISK") {
                return (renderRuleThreshold(rule))
            } else {
                return (renderMeasurementTitle(measurement.measurementType) + operatorString + renderRuleThreshold(rule))
            }
        } else {
            return ('OK')
        }
    }	

    const renderBackgroundColor = () => {
        if(notification) {
            const { rule } = notification
            if(rule) {
                const { actionType, actionParameter } = rule
                if(actionType === 1) {
                    if(actionParameter) {
                        return actionParameter
                    }
                }
                return '#C63C3C' //red
            }
        }
        return '#33ba69'
    }

    const { classes, notification, measurements } = props;
    return (
        <>
            <div className={classes.root} style={{backgroundColor: renderBackgroundColor()}}>
                <div className={classes.rootContent}>
                    <div className={classes.details}>
                        <div className={classes.textContainer}>
                            <Typography className={classes.titleText}>{renderTitle()}</Typography>
                            <Typography className={classes.titleSubtext}>{renderTimestamp()}</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withStyles(styles)(NotificationComponent);
