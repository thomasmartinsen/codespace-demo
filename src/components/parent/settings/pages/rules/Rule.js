import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import clsx from 'clsx'
import { 
    makeStyles, 
    Typography,
    CircularProgress,
    Grid,
    Switch,
    MenuItem,
    FormControl,
    IconButton,
    useTheme,
    useMediaQuery
} from '@material-ui/core';
import { CustomInputLabel, CustomTextField, CustomSelect } from '../../../../sub/restyled-mui/CustomInputs'
import { CustomButton } from '../../../../../components/sub/restyled-mui/CustomButton'
import { getRules, updateRule, createRule } from '../../../../../actions/rules'
import { getDevices } from '../../../../../actions/devices'
import { getMeasurementTypes } from '../../../../../actions/measurementTypes'
import moment from 'moment'
import Navigation from '../../Navigation'
import { push } from 'connected-react-router'
import UIIcons from '../../../../../icons/ui-icons'
import { copyToClipboard } from '../../../../../utils/copyToClipboard'


export const actionTypes = [
    {
        label:"Send an email",
        value:0,
        helperText:"Email address"
    },
    {
        label:"Change the color",
        value:1,
        helperText:"Hex code"
    },
    {
        label:"Webhook",
        value:2,
        helperText:"URL"
    },
    {
        label:"Daily Email",
        value:3,
        helperText:"Email address"
    }
]

export const operators = [
    {
        label:"Less than (<)",
        value:2
    },
    {
        label:"Greater than (>)",
        value:1
    },
    {
        label:"Equal to (=)",
        value:3
    },
    {
        label:"Range (Min/Max)",
        value:4
    }
]

const useStyles = makeStyles((theme) => ({
    loading:{
        position:'absolute',
        transform:'translate(-50%, -50%)',
        top:'50%',
        left:'50%'
    },
    formContainer: {
        padding:theme.spacing(2, 0)
    },
    formSubtitle: {
        margin:theme.spacing(4, 0, 4, 0)
    },
    headerContainer: {
        display:'flex',
        alignItems:'center'
    },
    titleContainer: {
        display:'flex',
        flexDirection:'column'
    },
    title: {
        fontWeight:400
    },
    cancelButton: {
        margin:theme.spacing(0, 2, 0, 0),
        backgroundColor:theme.palette.common.white,
    },
    submitButton: {
        margin:theme.spacing(0, 0, 0, 2),
    },
    buttonProgress: {
        marginRight:theme.spacing(2)
    },
    selectMenuItem: {
        flexDirection:'column',
        alignItems:'start'
    },
    readOnlyContainer: {
        display:'flex',
        alignItems:'center'
    },
    copyIcon: {
        height:15,
        width:15
    },
    copyButton: {
        padding:theme.spacing(2)
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        margin:theme.spacing(3)
    },
    activeButton: {
        marginRight:theme.spacing(4)
    },
    activeButtonInactive: {
        backgroundColor:theme.palette.common.white,
    },
    actionButtons: {
        marginLeft:'auto'
    }
}))

const mapStateToProps = (state, ownProps) => ({
    rules:state.rules,
    devices:state.devices,
    measurementTypes:state.measurementTypes,
    apiLoading:state.status.loading,
    client:state.client
});

const Rule = (props) => {
    const classes = useStyles();
    const theme = useTheme()
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(true)
    const [rule, setRule] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const { rules, getRules, updateRule, createRule, getDevices, devices, measurementTypes, getMeasurementTypes, client, match, push, apiLoading, creating } = props

    useEffect(() => {
        if(!rules) {
            getRules()
        }
    }, [rules, getRules])

    useEffect(() => {
        if(!devices) {
            getDevices()
        }
    }, [devices, getDevices])

    useEffect(() => {
        if(!measurementTypes) {
            getMeasurementTypes()
        }
    }, [measurementTypes, getMeasurementTypes])

    useEffect(() => {
        if(rules && devices) {
            if(creating) {
                setRule({
                    customerId:client.id,
                    verticalId:client.verticalId,
                    deviceId:'',
                    operation:0,
                    measurementType:'',
                    threshold:'',
                    isActive:true, 
                    isEnabled:false,
                    actionType:0,
                    actionParameter:'',
                    isForecast:false,
                    forecastType:0,
                })
                setLoading(false)
            } else {
                const rule = rules.find(x => x.id === match.params.id)
                if(rule) {
                    setRule(rule)
                }
                setLoading(false)
            }
        }
    }, [rules, match.params.id, creating, client, devices])

    useEffect(() => {
        if(!apiLoading && submitted) {
            push(`${client.defaultPath}/settings/rules`)
            setSubmitted(false)
        }

    }, [apiLoading, submitted, push, client.defaultPath])

    const handleTextInputChange = (state) => (e) => {
        setRule({
            ...rule,
            [state]:e.target.value
        })
    }

    const toggleProperty = (state) => (e) => {
        setRule({
            ...rule,
            [state]:!rule[state]
        })
    }

    const handleSubmit = () => {
        updateRule(rule)
        setSubmitted(true)
    }

    const handleCreate = () => {
        createRule(rule)
        setSubmitted(true)
    }

    const handleCancel = () => {
        push(`${client.defaultPath}/settings/rules`)
    }

    const renderActionButtons = () => {
        return (
            <div className={classes.actionButtons}>  
                {!creating && <CustomButton
                    onClick={toggleProperty('isActive')}
                    color={!rule.isActive ? 'secondary' : 'default'}
                    disableElevation
                    className={clsx(classes.activeButton, rule.isActive ? classes.activeButtonInactive : null)}
                    variant={'contained'}
                >{rule.isActive ? 'Deactivate' : 'Activate'}</CustomButton>}
                <CustomButton 
                    onClick={handleCancel} 
                    disabled={apiLoading} 
                    variant="contained" 
                    disableElevation 
                    className={classes.cancelButton}
                >
                    Cancel
                </CustomButton>
                <CustomButton 
                    onClick={creating ? handleCreate : handleSubmit} 
                    disabled={apiLoading}
                    variant="contained" 
                    disableElevation 
                    color="secondary" 
                    className={classes.submitButton}
                >
                {apiLoading ?
                    <CircularProgress size={14}/>
                    : 'Submit'
                }
                </CustomButton>
            </div>
        )
    }

    const renderForm = () => {
        return (
            <Grid container spacing={4} className={classes.formContainer}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h4" className={classes.formSubtitle}>Details</Typography>
                        <CustomInputLabel>Device</CustomInputLabel>
                        <FormControl
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            size="small"
                        >
                            <CustomSelect 
                                inputProps={{
                                    margin:'dense'
                                }}
                                type="text"
                                onChange={handleTextInputChange('deviceId')}
                                value={rule.deviceId}
                                renderValue={x => x}
                            >
                                {devices.map(device => {
                                    return(
                                        <MenuItem key={device.deviceId} value={device.deviceId} className={classes.selectMenuItem}>
                                            <Typography variant="body1">{device.deviceId}</Typography>
                                            <Typography variant="subtitle1">{device.description}</Typography>
                                        </MenuItem>
                                    )
                                })}
                            </CustomSelect>
                        </FormControl>
                        <CustomInputLabel>Measurement Type</CustomInputLabel>
                        <FormControl
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            size="small"
                        >
                            <CustomSelect 
                                inputProps={{
                                    margin:'dense'
                                }}
                                type="text"
                                onChange={handleTextInputChange('measurementType')}
                                value={rule.measurementType}
                                renderValue={x => x}
                            >
                                {measurementTypes.map(measurementType => {
                                    return(
                                        <MenuItem key={measurementType.name} value={measurementType.name} className={classes.selectMenuItem}>
                                            <Typography variant="body1">{measurementType.name}</Typography>
                                            <Typography variant="subtitle1">{measurementType.measureType}</Typography>
                                        </MenuItem>
                                    )
                                })}
                            </CustomSelect>
                        </FormControl>
                        <CustomInputLabel>Operator</CustomInputLabel>
                        <FormControl
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            size="small"
                        >
                            <CustomSelect 
                                inputProps={{
                                    margin:'dense'
                                }}
                                type="text"
                                onChange={handleTextInputChange('operation')}
                                value={rule.operation}
                            >
                                {operators.map(operator => {
                                    return(
                                        <MenuItem key={operator.value} value={operator.value} className={classes.selectMenuItem}>
                                            {operator.label}
                                        </MenuItem>
                                    )
                                })}
                            </CustomSelect>
                        </FormControl>
                        <CustomInputLabel>Threshold</CustomInputLabel>
                        <CustomTextField 
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                            type="number"
                            onChange={handleTextInputChange('threshold')}
                            value={rule.threshold}
                        />
                        <CustomInputLabel>Action Type</CustomInputLabel>
                        <FormControl
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            size="small"
                        >
                            <CustomSelect 
                                inputProps={{
                                    margin:'dense'
                                }}
                                type="text"
                                onChange={handleTextInputChange('actionType')}
                                value={rule.actionType}
                            >
                                {actionTypes.map(type => {
                                    return(
                                        <MenuItem key={type.value} value={type.value} className={classes.selectMenuItem}>
                                            {type.label}
                                        </MenuItem>
                                    )
                                })}
                            </CustomSelect>
                        </FormControl>
                        <CustomInputLabel>{actionTypes.find(type => type.value === rule.actionType) ? actionTypes.find(type => type.value === rule.actionType).helperText : ' '}</CustomInputLabel>
                        <CustomTextField 
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                            type="text"
                            onChange={handleTextInputChange('actionParameter')}
                            value={rule.actionParameter}
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <Navigation push={push} client={client}>
            {loading ?
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            :
                rule && devices ?
                    <>
                        <div className={classes.headerContainer}>
                            <div className={classes.titleContainer}>
                                <Typography variant="h2" className={classes.title}>{creating ? 'New Rule' : 'Edit Rule'}</Typography>
                            </div>
                            <span className={classes.activeDot} style={{backgroundColor:rule.isActive ? theme.palette.indicators.green : theme.palette.generalUi.borders}} />
                            {!smallScreen && renderActionButtons()}
                        </div>
                        {renderForm()}
                        {smallScreen && renderActionButtons()}
                   </>
                :
                <Typography variant="h2">Rule not found</Typography>
            }
        </Navigation>
    );
        
}

export default connect(mapStateToProps, { getRules, updateRule, createRule, getDevices, getMeasurementTypes, push })(Rule);