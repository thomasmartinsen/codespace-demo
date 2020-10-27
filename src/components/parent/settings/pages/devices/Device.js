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
import { CustomButton } from '../../../../sub/restyled-mui/CustomButton'
import { getDevices, updateDevice, createDevice } from '../../../../../actions/devices'
import { getDeviceTypes } from '../../../../../actions/deviceTypes'
import moment from 'moment'
import { push } from 'connected-react-router'
import Navigation from '../../Navigation'
import UIIcons from '../../../../../icons/ui-icons'
import { copyToClipboard } from '../../../../../utils/copyToClipboard'

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
    devices:state.devices,
    apiLoading:state.status.loading,
    deviceTypes:state.deviceTypes,
    client:state.client
});

const Device = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(true)
    const [device, setDevice] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const { devices, getDevices, updateDevice, createDevice, deviceTypes, getDeviceTypes, client, match, push, apiLoading, creating } = props

    useEffect(() => {
        if(!devices) {
            getDevices()
        }
    }, [devices, getDevices])

    useEffect(() => {
        if(!deviceTypes) {
            getDeviceTypes()
        }
    }, [deviceTypes, getDeviceTypes])

    useEffect(() => {
        if(devices) {
            if(creating) {
                setDevice({
                    customerId:client.id,
                    verticalId:client.verticalId,
                    deviceId:'',
                    deviceType:'',
                    description:'',
                    isActive:true,
                    longitude:0,
                    latitude:0,   
                })
                setLoading(false)
            } else {
                const device = devices.find(x => x.id === match.params.id)
                if(device) {
                    setDevice(device)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }
        }
    }, [devices, match.params.id, creating, client])

    useEffect(() => {
        if(!apiLoading && submitted) {
            push(`${client.defaultPath}/settings/devices`)
            setSubmitted(false)
        }

    }, [apiLoading, submitted, push, client.defaultPath])

    const handleTextInputChange = (state) => (e) => {
        setDevice({
            ...device,
            [state]:e.target.value
        })
    }

    const toggleProperty = (state) => (e) => {
        setDevice({
            ...device,
            [state]:!device[state]
        })
    }

    const handleSubmit = () => {
        updateDevice(device)
        setSubmitted(true)
    }

    const handleCreate = () => {
        createDevice(device)
        setSubmitted(true)
    }

    const handleCancel = () => {
        push(`${client.defaultPath}/settings/devices`)
    }

    const renderActionButtons = () => {
        return (
            <div className={classes.actionButtons}>  
                {!creating && <CustomButton
                    onClick={toggleProperty('isActive')}
                    color={!device.isActive ? 'secondary' : 'default'}
                    disableElevation
                    className={clsx(classes.activeButton, device.isActive ? classes.activeButtonInactive : null)}
                    variant={'contained'}
                >{device.isActive ? 'Deactivate' : 'Activate'}</CustomButton>}
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

    const convertTime = (date) => {
        return moment(date).format("DD/MM/YY - HH:mm")
    }

    const renderForm = () => {
        return (
            
            <Grid container spacing={4} className={classes.formContainer}>
                {!creating &&
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid item xs={12} md={6} lg={4}>
                            <CustomInputLabel>Last Updated</CustomInputLabel>
                            <div className={classes.readOnlyContainer}>
                                <Typography variant="body1">{convertTime(device.lastUpdated)}</Typography>
                                <IconButton className={classes.copyButton} onClick={() => copyToClipboard(device.lastUpdated)}><UIIcons.CopyIcon className={classes.copyIcon}/></IconButton>
                            </div>
                            <CustomInputLabel>Last Seen</CustomInputLabel>
                            <div className={classes.readOnlyContainer}>
                                <Typography variant="body1">{convertTime(device.lastUpdated)}</Typography>
                                <IconButton className={classes.copyButton} onClick={() => copyToClipboard(device.lastUpdated)}><UIIcons.CopyIcon className={classes.copyIcon}/></IconButton>
                            </div>
                        </Grid>
                    </Grid>
                }
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h4" className={classes.formSubtitle}>Details</Typography>
                        <CustomInputLabel>Device ID</CustomInputLabel>
                        <CustomTextField 
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                            type="text"
                            onChange={handleTextInputChange('deviceId')}
                            disabled={!creating}
                            value={device.deviceId}
                        />
                        <CustomInputLabel>Description</CustomInputLabel>
                        <CustomTextField 
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                            type="text"
                            onChange={handleTextInputChange('description')}
                            value={device.description}
                        />
                        <CustomInputLabel>Device Type</CustomInputLabel>
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
                                onChange={handleTextInputChange('deviceType')}
                                value={device.deviceType}
                                renderValue={x => x}

                            >
                                {deviceTypes.map(deviceType => {
                                    return(
                                        <MenuItem value={deviceType.name} className={classes.selectMenuItem}>
                                            <Typography variant="body1">{deviceType.name}</Typography>
                                            <Typography variant="subtitle1">{deviceType.producer}</Typography>
                                        </MenuItem>
                                    )
                                })

                                }
                            </CustomSelect>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h4" className={classes.formSubtitle}>Position</Typography>
                        <CustomInputLabel>Longitude</CustomInputLabel>
                        <CustomTextField 
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                            onChange={handleTextInputChange('longitude')}
                            value={device.longitude}
                        />
                        <CustomInputLabel>Latitude</CustomInputLabel>
                        <CustomTextField 
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                            onChange={handleTextInputChange('latitude')}
                            value={device.latitude}
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
                device && deviceTypes ?
                    <>
                        <div className={classes.headerContainer}>
                            <div className={classes.titleContainer}>
                                <Typography variant="h2" className={classes.title}>{creating ? 'New Device' : device.deviceId}</Typography>
                            </div>
                            <span className={classes.activeDot} style={{backgroundColor:device.isActive ? theme.palette.indicators.green : theme.palette.generalUi.borders}} />
                            {!smallScreen && renderActionButtons()}
                        </div>
                        {renderForm()}
                        {smallScreen && renderActionButtons()}
                   </>
                :
                <Typography variant="h2">Device not found</Typography>
            }
        </Navigation>
    );
        
}

export default connect(mapStateToProps, { getDevices, updateDevice, createDevice, getDeviceTypes, push })(Device);