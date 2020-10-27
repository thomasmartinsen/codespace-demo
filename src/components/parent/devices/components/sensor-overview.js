import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withStyles, Grid, Table, TableHead, TableRow, TableCell, TableBody, InputAdornment, CircularProgress } from '@material-ui/core';
import { Paper, Typography } from '@material-ui/core';
import { CustomTextField } from '../../../sub/restyled-mui/CustomInputs'
import Image from 'react-image';
import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/da';
import { renderBatteryIcon, renderMeasurementIcon } from '../../../../utils/measurementTypes'
import UIIcons from '../../../../icons/ui-icons'
import { CustomTable, CustomTableHead, CustomTableBody, CustomTableCell, CustomTableRow } from '../../../sub/restyled-mui/CustomTable'

const styles = theme => ({
    root: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        width: `100%`,
        overflowY: 'auto',
    },
    sensorLink: {
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.common.lines,
            borderRadius: theme.spacing(1),
        }
    },
    table: {
        maxWidth: '100%',
    },
    row: {
        backgroundColor: '#FAFAFA',
        border: `1px solid ${theme.palette.common.cardOutline}`,
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(2),
        padding: 0,
    },
    item: {
        backgroundColor: '#FAFAFA',
        borderBottom: 'none',
        padding: 0,
        maxWidth: '100%',
    },
    header: {
        background: theme.palette.primary.main,
        height: theme.spacing(8),
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    heading: {
        color: theme.palette.common.white,
        font: `13px ${theme.typography.fontFamily}, Regular`,
    },
    body: {
        marginBottom: theme.spacing(2),
    },
    imageCell: {
        padding:theme.spacing(1)
    },
    image: {
        marginTop:2,
        maxWidth: 32,
        width: 32,
        height: 32,
        border: `1px solid ${theme.palette.common.cardOutline}`,
        borderRadius: 4,
        margin: `0 ${theme.spacing(6)}px -${theme.spacing(1/2)}px ${theme.spacing(4)}px`,
        boxSizing: 'border-box',
    },
    dropdownIcon: {
        width: 16,
        height: 16,
        cursor: 'pointer',
        '& path': {
            fill: theme.palette.common.white
        }
    },
    icon: {
        width: 32,
        height: 32,
        '& path': {
            fill: theme.palette.controls.menuIcon
        }
    },
    sortIcon: {
        width: 0,
        height: 0,
        position: 'absolute',
        marginTop: 5,
        marginLeft: 5,
        cursor: 'pointer',
    },
    sortIconInactive: {
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: `6px solid ${theme.palette.common.white}`,
        opacity: .5
    },
    sortIconActive: {
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: `6px solid ${theme.palette.common.white}`,
        opacity: 1
    },
    sortIconAsc: {
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: `6px solid ${theme.palette.common.white}`,
    },
    sortIconDes: {
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: `6px solid ${theme.palette.common.white}`,
    },
    red: {
        color: theme.palette.tertiary.main
    },
    noResult: {
        padding: `${theme.spacing(2)}px 0`,
        background: 'none',

    },
    sticky: {
        position: "sticky",
        top: 0,
        zIndex:3
    },
    activeIcon: {
        borderRadius:'50%',
        width:16,
        height:16,
        display:'inline-block',
        marginTop:3
    },
    iconActive: {
        backgroundColor:theme.palette.indicators.green
    },
    iconInactive: {
        backgroundColor:theme.palette.controls.main
    },
    tableCellIcon: {
        paddingLeft:theme.spacing(0),
        transform:'translateY(-50%)',
        position:'absolute',
        top:'50%',
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
    scrollableTableBody: {
        flex:'1 1 0px',
        minHeight:0,
        overflowY:'scroll',
    },
    stickyTableHeader: {
        marginRight:theme.spacing(4.25)
    },
    tableContainer: {
        overflow:'auto',
        flex:1,
        display:'flex',
        flexDirection:'column'
    },
    deviceIcon: {
        marginTop:3
    }
})

const SensorOverview = (props) => {
    const [sort, setSort] = useState({sortBy: 'name', sortDirection: 'asc'})
    const [displaySensors, setDisplaySensors] = useState([])
    const [search, setSearch] = useState('')
    const { sensors, classes, client } = props

    useEffect(() => {
        if(displaySensors.length !== sensors.length) {
            setDisplaySensors(_.orderBy(sensors, [sort.sortBy], [sort.sortDirection]))
        }   
    }, [sort, sensors, displaySensors])

    const activeIcon = isActive => {
        const { classes } = props;
        return (
            <span className={cx(classes.activeIcon, isActive ? classes.iconActive : classes.iconInactive)} />
        )
    }

    const renderPrimaryMeasurementIcon = measurements => {
        const { classes } = props;
        let primaryMeasurement = "";
        if(measurements !== null) {
            measurements.forEach((measurement) => {
                if(measurement.isPrimary) {
                    primaryMeasurement = measurement
                }
            })
        }
        return renderMeasurementIcon(primaryMeasurement, cx(classes.icon, classes.tableCellIcon))
    }

    const renderLatestMeasurement = measurements => {
        let primaryValue = "";
        if(measurements !== null) {
            measurements.forEach((measurement) => {
                if(measurement.isPrimary) {
                    primaryValue = Math.round((measurement.value + Number.EPSILON) * 100) / 100
                }
            })
        }
        return primaryValue
    }

    const parseLatestMeasurement = measurement => {
		return Number.isFinite(measurement)
			? measurement
			: measurement < Number.MAX_VALUE
			? 'Fejl i måling'
			: 'Måling ikke mulig';
	};

    const handleSensorClick = deviceId => {
        const { push, client } = props;
        push(`${client.defaultPath}/device/${deviceId}`);
    }

    const sortByKey = (key, sortDirection) => {
        let sortedArray = _.orderBy(sensors, [key], [sortDirection]);
        setDisplaySensors(sortedArray)
        setSort({sortBy: key, sortDirection})
    }

    const renderSortingLink = key => {
        return (
            <span
                className={cx(classes.sortIcon, (sort.sortBy === key ? cx((sort.sortDirection === 'asc' ? classes.sortIconAsc : classes.sortIconDes)) : classes.sortIconInactive))}
                onClick={() => sortByKey(key, (sort.sortBy === key ? (sort.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc'))} />
        )
    }

    const renderPin = (sensor) => {
        const _COLOR = sensor.attributes ? sensor.attributes.iconColor : '#000000';
        return(<svg className={classes.deviceIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g transform="translate(-925 -215.811)"><g transform="translate(-268 -146.189)"><g style={{fill:'#fff'}} transform="translate(1193 362)"><path style={{stroke:'none'}} d="M 8 15.25 C 4.002339839935303 15.25 0.75 11.99765968322754 0.75 8 C 0.75 4.002339839935303 4.002339839935303 0.75 8 0.75 C 11.99765968322754 0.75 15.25 4.002339839935303 15.25 8 C 15.25 11.99765968322754 11.99765968322754 15.25 8 15.25 Z"/><path style={{fill:_COLOR, stroke:'none'}} d="M 8 1.5 C 4.415889739990234 1.5 1.5 4.415889739990234 1.5 8 C 1.5 11.58411026000977 4.415889739990234 14.5 8 14.5 C 11.58411026000977 14.5 14.5 11.58411026000977 14.5 8 C 14.5 4.415889739990234 11.58411026000977 1.5 8 1.5 M 8 0 C 12.41827964782715 0 16 3.581720352172852 16 8 C 16 12.41827964782715 12.41827964782715 16 8 16 C 3.581720352172852 16 0 12.41827964782715 0 8 C 0 3.581720352172852 3.581720352172852 0 8 0 Z"/></g><circle style={{fill:_COLOR, stroke:'#fff', strokeLinejoin:'round', strokeMiterlimit:10, strokeWidth:'1.5px'}} cx="4" cy="4" r="4" transform="translate(1197 366)"/></g></g></svg>)
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const searchFilter = (device) => {
        const regex = new RegExp('\\b' + search, 'i');
        return regex.test(`${device.description} ${device.deviceId}`);
    }

    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <Typography variant="h2">Sensorer</Typography>
                <CustomTextField 
                    variant="outlined"
                    margin="dense"
                    size="small"
                    type="text"
                    placeholder="Søg efter sensor"
                    className={classes.searchBar}
                    onChange={handleSearchChange}
                    value={search}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <UIIcons.SearchIcon className={classes.inputAdornmentIcon}/>
                        </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className={classes.tableContainer}>
                <div className={classes.stickyTableHeader}>
                    <CustomTable>
                        <CustomTableHead>
                            <CustomTableRow>
                                <CustomTableCell style={{width:'50px'}}>{' '}</CustomTableCell>
                                <CustomTableCell style={{width:'15%'}}>{'Sensor ID'}{renderSortingLink('deviceName')}</CustomTableCell>
                                <CustomTableCell style={{maxWidth:'15%'}}>{'Beskrivelse'}{renderSortingLink('description')}</CustomTableCell>
                                <CustomTableCell style={{width:'15%'}}>{'Type'}{renderSortingLink('deviceType')}</CustomTableCell>
                                <CustomTableCell style={{width:'15%'}}>{'Seneste måling'}{renderSortingLink('lastUpdated')}</CustomTableCell>
                                <CustomTableCell style={{width:'15%'}}>{'Måleparameter'}</CustomTableCell>
                                <CustomTableCell align="center" style={{ width:'100px' }}>{'Aktiv'}{renderSortingLink('isActive')}</CustomTableCell>
                            </CustomTableRow>
                        </CustomTableHead>
                    </CustomTable>
                </div>
                <div className={classes.scrollableTableBody}>
                    <CustomTable>
                        <CustomTableBody>
                            {displaySensors ?
                                displaySensors
                                .filter(x => searchFilter(x))
                                .map(sensor => {
                                    const { deviceId, deviceType, description, lastSeen, id, deviceGroupId } = sensor;
                                    const _timestamp = lastSeen ? moment().diff(lastSeen, 'days') >= 1 ? <span className={classes.red}>{moment.utc(lastSeen).local().fromNow()}</span> : moment.utc(lastSeen).local().fromNow() : '-';
                                    return (
                                        <CustomTableRow hover onClick={() => handleSensorClick(deviceId)} key={id}>
                                            <CustomTableCell style={{width:'50px'}}>{renderPin(sensor)}</CustomTableCell>
                                            <CustomTableCell style={{width:'15%'}}>{deviceId}</CustomTableCell>
                                            <CustomTableCell style={{maxWidth:'15%'}}>{description}</CustomTableCell>
                                            <CustomTableCell style={{width:'15%'}}>{deviceType}</CustomTableCell>
                                            <CustomTableCell style={{width:'15%'}}>{_timestamp}</CustomTableCell>
                                            <CustomTableCell style={{width:'15%'}}>
                                                <Grid container
                                                    direction="row"
                                                    justify="flex-start"
                                                    alignItems="center"
                                                    spacing={4}>
                                                    <Grid item style={{minWidth: '32px'}}>{renderPrimaryMeasurementIcon(sensor.measurements)}</Grid>
                                                    <Grid item><Typography variant="h4">{renderLatestMeasurement(sensor.measurements)}</Typography></Grid>
                                                </Grid>
                                            </CustomTableCell>
                                            <CustomTableCell align="center" style={{width:'100px'}}>{activeIcon(sensor.isActive)}</CustomTableCell>
                                        </CustomTableRow>)
                                })
                            :
                                <CircularProgress />
                            }
                            {sensors.length === 0 && (
                                <CustomTableRow classes={{ root: classes.noResults }}>
                                    <CustomTableCell colSpan={4}><Typography variant="body2">{'Ingen resultater'}</Typography></CustomTableCell>
                                    <CustomTableCell colSpan={5}></CustomTableCell>
                                    <CustomTableCell>{''}</CustomTableCell>
                                </CustomTableRow>
                            )}
                        </CustomTableBody>
                    </CustomTable>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(SensorOverview);