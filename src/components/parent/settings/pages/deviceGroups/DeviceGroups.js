import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import clsx from 'clsx'
import { 
    makeStyles, 
    Typography,
    CircularProgress,
    useTheme
} from '@material-ui/core';
import { CustomTable, CustomTableHead, CustomTableBody, CustomTableCell, CustomTableRow } from '../../../../sub/restyled-mui/CustomTable'
import { CustomButton } from '../../../../sub/restyled-mui/CustomButton'
import { getDeviceGroups } from '../../../../../actions/deviceGroups'
import { getDeviceTypes } from '../../../../../actions/deviceTypes'
import Navigation from '../../Navigation'
import { renderMeasurementTitle } from '../../../../../utils/measurementTypes'
import { push } from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
    loading:{
        position:'absolute',
        transform:'translate(-50%, -50%)',
        top:'50%',
        left:'50%'
    },
    tableRow: {
        cursor:'pointer'
    },
    headerContainer: {
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addNewButton: {
        marginLeft: 'auto'
    },
}))

const mapStateToProps = (state) => ({
    deviceGroups:state.deviceGroups,
    deviceTypes:state.deviceTypes,
    client:state.client
})

const DeviceGroupGroups = (props) => {
    const classes = useStyles();
    const theme = useTheme()
    const { deviceGroups, getDeviceGroups, deviceTypes, getDeviceTypes, client, push, location } = props

    useEffect(() => {
        if(!deviceGroups) {
            getDeviceGroups()
        }
    }, [deviceGroups, getDeviceGroups])

    useEffect(() => {
        if(!deviceTypes) {
            getDeviceTypes()
        }
    }, [deviceTypes, getDeviceTypes])

    const handleCreate = () => {
        push(`${location.pathname}/create`)
    }

    const renderActionButtons = () => {
        return (
            <CustomButton 
                onClick={handleCreate} 
                variant="contained" 
                disableElevation 
                color="secondary" 
                className={classes.addNewButton}
            >
                Add new
            </CustomButton>
        )
    }

    return (
        <Navigation push={push} client={client}>
            <div className={classes.headerContainer}>
                <Typography variant="h2">Device Groups</Typography>
                {renderActionButtons()}
            </div>
            <CustomTable>
                <CustomTableHead>
                    <CustomTableRow>
                        <CustomTableCell>
                            Color
                        </CustomTableCell>
                        <CustomTableCell>
                            Primary Measurement
                        </CustomTableCell>
                    </CustomTableRow>
                </CustomTableHead>
                {deviceGroups &&
                    <CustomTableBody>
                        {
                            deviceGroups.map(deviceGroup => {
                                const { id, attributes } = deviceGroup
                                return (
                                    <CustomTableRow key={id} className={classes.tableRow} hover onClick={() => push(`${location.pathname}/${id}`)}>
                                        <CustomTableCell>
                                            {attributes.color}
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            {renderMeasurementTitle(attributes.primaryMeasurementType)}
                                        </CustomTableCell>
                                    </CustomTableRow>
                                )
                            })
                        }
                    </CustomTableBody>
                    
                }
                {!deviceGroups &&
                    <div className={classes.loading}>
                        <CircularProgress />
                    </div>

                }
            </CustomTable>
        </Navigation>
    );
        
}

export default connect(mapStateToProps, { getDeviceGroups, getDeviceTypes, push })(DeviceGroupGroups);