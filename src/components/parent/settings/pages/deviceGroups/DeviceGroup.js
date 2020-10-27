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
import { getDeviceGroups, updateDeviceGroup, createDeviceGroup } from '../../../../../actions/deviceGroups'
import { getDeviceTypes } from '../../../../../actions/deviceTypes'
import { push } from 'connected-react-router'
import { getMeasurementTypes } from '../../../../../actions/measurementTypes'
import moment from 'moment'
import Navigation from '../../Navigation'
import UIIcons from '../../../../../icons/ui-icons'
import { copyToClipboard } from '../../../../../utils/copyToClipboard'
import { sensorColorPalette } from '../../../../../styles/colors'
import ColorSelect from '../../../../sub/restyled-mui/ColorSelect'

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
    actionButtons: {
        marginLeft:'auto'
    }
}))

const mapStateToProps = (state, ownProps) => ({
    deviceGroups:state.deviceGroups,
    apiLoading:state.status.loading,
    deviceTypes:state.deviceTypes,
    client:state.client,
    measurementTypes:state.measurementTypes
});

const DeviceGroup = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(true)
    const [deviceGroup, setDeviceGroup] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const { deviceGroups, getDeviceGroups, updateDeviceGroup, measurementTypes, getMeasurementTypes, client, match, push, apiLoading, creating } = props

    useEffect(() => {
        if(!deviceGroups) {
            getDeviceGroups()
        }
    }, [deviceGroups, getDeviceGroups])

    useEffect(() => {
        if(!measurementTypes) {
            getMeasurementTypes()
        }
    }, [measurementTypes, getMeasurementTypes])

    useEffect(() => {
        if(deviceGroups) {
            if(creating) {
                setDeviceGroup({
                    customerId:client.id,
                    verticalId:client.verticalId,
                    attributes: {
                        color:'',
                        primaryMeasurementType:''
                    } 
                })
                setLoading(false)
            } else {
                const deviceGroup = deviceGroups.find(x => x.id === match.params.id)
                if(deviceGroup) {
                    setDeviceGroup(deviceGroup)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }
        }
    }, [deviceGroups, match.params.id, creating, client])

    useEffect(() => {
        if(!apiLoading && submitted) {
            push(`${client.defaultPath}/settings/deviceGroups`)
            setSubmitted(false)
        }

    }, [apiLoading, submitted, push, client.defaultPath])

    const handleTextInputChange = (state) => (e) => {
        setDeviceGroup({
            ...deviceGroup,
            attributes: {
                ...deviceGroup.attributes,
                [state]:e.target.value
            }
            
        })
    }

    const handleSwitchInputChange = (state) => (e) => {
        setDeviceGroup({
            ...deviceGroup,
            [state]:!deviceGroup[state]
        })
    }

    const handleSubmit = () => {
        updateDeviceGroup(deviceGroup)
        setSubmitted(true)
    }

    const handleCreate = () => {
        createDeviceGroup(deviceGroup)
        setSubmitted(true)
    }

    const handleCancel = () => {
        push(`${client.defaultPath}/settings/device-groups`)
    }

    const renderActionButtons = () => {
        return (
            <div className={classes.actionButtons}>
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
            
            <Grid container spacing={6} className={classes.formContainer}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h4" className={classes.formSubtitle}>Attributes</Typography>
                        <CustomInputLabel>Color</CustomInputLabel>
                        <ColorSelect options={sensorColorPalette} value={deviceGroup.attributes.color} label="Color" onChange={handleTextInputChange('color')} />
                        <CustomInputLabel>Primary Measurement Type</CustomInputLabel>
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
                                onChange={handleTextInputChange('primaryMeasurementType')}
                                value={deviceGroup.attributes.primaryMeasurementType}
                                renderValue={x => x}

                            >
                                {measurementTypes.map(measurementType => {
                                    return(
                                        <MenuItem value={measurementType.name} className={classes.selectMenuItem}>
                                            {measurementType.name}
                                            <Typography variant="subtitle1">{measurementType.measureType}</Typography>
                                        </MenuItem>
                                    )
                                })

                                }
                            </CustomSelect>
                        </FormControl>
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
                deviceGroup ?
                    <>
                        <div className={classes.headerContainer}>
                            <div className={classes.titleContainer}>
                                <Typography variant="h2" className={classes.title}>{creating ? 'New Device Group' : 'Device Group'}</Typography>
                            </div>
                            {!smallScreen && renderActionButtons()}
                        </div>
                        {renderForm()}
                        {smallScreen && renderActionButtons()}
                   </>
                :
                <Typography variant="h2">DeviceGroup not found</Typography>
            }
        </Navigation>
    );
        
}
export default connect(mapStateToProps, { getDeviceGroups, updateDeviceGroup, createDeviceGroup, getMeasurementTypes, push })(DeviceGroup);
