import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import clsx from 'clsx'
import { 
    makeStyles, 
    Typography,
    CircularProgress,
    useTheme,
    InputAdornment
} from '@material-ui/core';
import { CustomTable, CustomTableHead, CustomTableBody, CustomTableCell, CustomTableRow } from '../../../../sub/restyled-mui/CustomTable'
import { CustomButton } from '../../../../sub/restyled-mui/CustomButton'
import { CustomTextField } from '../../../../sub/restyled-mui/CustomInputs'
import { getDevices } from '../../../../../actions/devices'
import { getDeviceTypes } from '../../../../../actions/deviceTypes'
import Navigation from '../../Navigation'
import UIIcons from '../../../../../icons/ui-icons'
import { push } from 'connected-react-router'
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    loading:{
        position:'absolute',
        transform:'translate(-50%, -50%)',
        top:'50%',
        left:'50%'
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    },
    activeDotContainer: {
        position:'relative'
    },
    tableRow: {
        cursor:'pointer'
    },
    headerContainer: {
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchBar: {
        marginLeft:theme.spacing(8),
        width:400
    },
    inputAdornmentIconSearch: {
        height:15,
        width:15
    },
    scrollableTableBodyContainer: {
        flex:'1 1 0px',
        minHeight:0,
        overflow:'auto',
    },
    stickyTableHeader: {
        marginRight:theme.spacing(4)
    },
    tableContainer: {
        overflow:'auto',
        flex:1,
        display:'flex',
        flexDirection:'column'
    },
    addNewButton: {
        marginLeft: 'auto'
    },
    sortIcon: {
        width: 0,
        height: 0,
        position: 'absolute',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        cursor: 'pointer',
    },
    sortIconInactive: {
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: `6px solid ${theme.palette.secondary.main}`,
        opacity: .5
    },
    sortIconActive: {
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: `6px solid ${theme.palette.secondary.main}`,
        opacity: 1
    },
    sortIconAsc: {
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: `6px solid ${theme.palette.secondary.main}`,
    },
    sortIconDes: {
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: `6px solid ${theme.palette.secondary.main}`,
    }
}))

const mapStateToProps = (state) => ({
    devices:state.devices,
    deviceTypes:state.deviceTypes,
    client:state.client
});

const Devices = (props) => {
    const classes = useStyles();
    const theme = useTheme()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(['deviceId', 'asc'])
    const [sortedDevices, setSortedDevices] = useState(['deviceId', 'description'])
    const { devices, getDevices, deviceTypes, getDeviceTypes, client, push, location } = props

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
            let orderedDevices = _.orderBy(devices, sort[0], sort[1]);
            setSortedDevices(orderedDevices)
        }
    }, [sort, setSortedDevices, devices])

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

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const searchFilter = (device) => {
        const regex = new RegExp('\\b' + search, 'i');
        return regex.test(`${device.description} ${device.deviceId}`);
    }

    const handleSortBy = (key, order) => {
        setSort([key, order])
    }

    const renderSortingLink = (key) => {
        const sortBy = sort[0]
        const sortDirection = sort[1]
        return (
            <span
                className={clsx(classes.sortIcon, (sortBy === key ? clsx(sortDirection === 'asc' ? classes.sortIconAsc : classes.sortIconDes) : classes.sortIconInactive))}
                onClick={() => handleSortBy(key, (sortBy === key ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'))} 
            />
        )
    }

    const filteredDevices = sortedDevices ? sortedDevices.filter(x => searchFilter(x)) : []
    return (
        <Navigation push={push} client={client}>
            <div className={classes.headerContainer}>
                <Typography variant="h2">Devices</Typography>
                <CustomTextField 
                    variant="outlined"
                    margin="dense"
                    size="small"
                    type="text"
                    placeholder="Filter Devices"
                    className={classes.searchBar}
                    onChange={handleSearchChange}
                    value={search}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <UIIcons.SearchIcon className={classes.inputAdornmentIconSearch}/>
                        </InputAdornment>
                        ),
                    }}
                />
                {renderActionButtons()}
            </div>
            <div className={classes.tableContainer}>
                <div className={classes.stickyTableHeader}>
                    <CustomTable>
                        <CustomTableHead>
                            <CustomTableRow>
                                <CustomTableCell style={{width:'10%'}}>
                                    ID 
                                    {renderSortingLink('deviceId')}
                                </CustomTableCell>
                                <CustomTableCell>
                                    Description
                                    {renderSortingLink('description')}
                                </CustomTableCell>
                                <CustomTableCell style={{width:64}}>
                                    Active
                                </CustomTableCell>
                            </CustomTableRow>
                        </CustomTableHead>
                    </CustomTable>
                </div>
                <div className={classes.scrollableTableBodyContainer}>
                    <div className={classes.scrollableTableBody}>
                        <CustomTable>
                            {devices &&
                                    <CustomTableBody>
                                        {filteredDevices.length > 0 ?
                                            filteredDevices.map(device => {
                                                const { description, id, deviceId, isActive } = device
                                                return (
                                                    <CustomTableRow key={id} className={classes.tableRow} hover onClick={() => push(`${location.pathname}/${id}`)}>
                                                        <CustomTableCell style={{width:'10%'}}>
                                                            {deviceId}
                                                        </CustomTableCell>
                                                        <CustomTableCell>
                                                            {description}
                                                        </CustomTableCell>
                                                        <CustomTableCell className={classes.activeDotContainer} style={{width:64}}>
                                                            <span className={classes.activeDot} style={{backgroundColor:isActive ? theme.palette.indicators.green : theme.palette.generalUi.borders}} />
                                                        </CustomTableCell>
                                                    </CustomTableRow>
                                                )
                                            })
                                        :
                                            <CustomTableRow className={classes.tableRow}>
                                                <CustomTableCell>
                                                    No devices found
                                                </CustomTableCell>
                                            </CustomTableRow>
                                        }
                                    </CustomTableBody>
                                
                            }
                            {!devices &&
                                <div className={classes.loading}>
                                    <CircularProgress />
                                </div>

                            }
                        </CustomTable>
                    </div>
                </div>
            </div>
        </Navigation>
    );
        
}

export default connect(mapStateToProps, { getDevices, getDeviceTypes, push })(Devices);