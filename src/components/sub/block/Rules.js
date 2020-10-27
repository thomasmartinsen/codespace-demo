import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	Typography,
} from '@material-ui/core';
import { renderMeasurementUnit, renderMeasurementTitle } from '../../../utils/measurementTypes'
import UIIcons from '../../../icons/ui-icons'

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
        padding: `${theme.spacing(4)}px ${theme.spacing(4)}px ${theme.spacing(3)}px ${theme.spacing(4.5)}px`,
        height: `calc(100% - ${theme.spacing(7)}px)`
    },
    titleContainer: {
        height:theme.spacing(7.5)
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
    ruleContainer: {
        padding:`${theme.spacing(1)}px 0`,
    },
    rulesContainer: {
        height:`calc(100% - ${theme.spacing(7.5)}px)`,
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
    ruleIcon: {
        height:20,
        width:20,
        '& path': {
            fill: theme.palette.common.defaultText
        },
        verticalAlign:'bottom',
        display:'inline-block',
        paddingRight:theme.spacing(1.5)
    },
    ruleText: {
        fontSize:theme.typography.pxToRem(13),
        fontWeight:400,
        padding:0,
        lineHeight:1.3,
        fontFamily:theme.typography.fontFamily,
        color:theme.palette.common.defaultText,
        display:'inline-block',
        marginBottom:2
    },
    bold: {
        fontWeight:500
    }
});

const RulesComponent = (props) => {
    
    const renderRuleThreshold = (rule) => {
        if(rule) {
            if(rule.measurementType === 'RISK') {
                switch(rule.threshold) {
                    case 1: return "ingen risiko"
                    case 2: return "risiko"
                    case 3: return "høj risiko"
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

    const actionTypes = [
        {
            label:"Send en email",
            value:0
        },
        {
            label:"Skift farve",
            value:1
        },
        {
            label:"Send en webhook",
            value:2
        },
        {
            label:"Send en email dagligt",
            value:3,
        }
    ]

    const { classes, rules } = props;
    return (
        <>
            <div className={classes.root}>
                <div className={classes.rootContent}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.titleText}>Regler</Typography>
                    </div>
                    <div className={classes.rulesContainer}>
                    {rules.length > 0 ?
                        rules.map(rule => {
                            const { operation, measurementType, actionParameter, actionType, id } = rule
                            const actionTypeLabel = actionTypes.find(obj => obj.value === actionType).label;
                            const truncatedActionParam = actionParameter.length > 30 ? actionParameter.slice(0, 30) + '...' : actionParameter
                            var operatorString = "";
                            switch(operation) {
                                case 1:
                                    operatorString = "over ";
                                    break;
                                case 2:
                                    operatorString = "under ";
                                    break;
                                case 3:
                                    operatorString = "";
                                    break;
                                case 4:
                                    operatorString = "mellem ";
                                    break;
                                default:
                                    //nothing
                            }
                            return(
                                <div className={classes.ruleContainer} key={id}>
                                    <UIIcons.BorderValueIcon className={classes.ruleIcon}/>
                                    <Typography className={classes.ruleText}>
                                        {actionTypeLabel + " til "}<b className={classes.bold}>{truncatedActionParam}</b>{" når " + renderMeasurementTitle(measurementType).toLowerCase() + " er " + operatorString + renderRuleThreshold(rule)}
                                    </Typography>
                                </div>
                            )
                        })
                        :
                        <Typography className={classes.ruleText}>Der er ikke defineret nogen regler</Typography>
                    }
                    </div>
                </div>
            </div>
        </>
    );
}

export default withStyles(styles)(RulesComponent);
