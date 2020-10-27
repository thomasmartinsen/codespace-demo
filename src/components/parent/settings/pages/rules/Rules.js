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
import { getRules } from '../../../../../actions/rules'
import { getDevices } from '../../../../../actions/devices'
import Navigation from '../../Navigation'
import UIIcons from '../../../../../icons/ui-icons'
import { push } from 'connected-react-router'
import { actionTypes, operators } from './Rule'

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
        alignItems: 'center',
    },
    searchBar: {
        marginLeft:theme.spacing(8),
        width:400
    },
    scrollableTableBody: {
        marginRight:16
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
}))

const mapStateToProps = (state) => ({
    rules:state.rules,
    devices:state.devices,
    ruleTypes:state.ruleTypes,
    client:state.client
});

const Rules = (props) => {
    const classes = useStyles();
    const theme = useTheme()
    const [search, setSearch] = useState('')
    const { rules, getRules, devices, getDevices, client, push, location } = props

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

    const searchFilter = (rule) => {
        const regex = new RegExp('\\b' + search, 'i');
        return regex.test(`${rule.description} ${rule.ruleId}`);
    }
    const filteredRules = rules ? rules.filter(x => searchFilter(x)) : []
    return (
        <Navigation push={push} client={client}>
            <div className={classes.headerContainer}>
                <Typography variant="h2">Rules</Typography>
                {renderActionButtons()}
            </div>
            <div className={classes.tableContainer}>
                <div className={classes.stickyTableHeader}>
                    <CustomTable>
                        <CustomTableHead>
                            <CustomTableRow>
                                <CustomTableCell >
                                    Rule
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
                            {rules && devices &&
                                    <CustomTableBody>
                                        {filteredRules.length > 0 ?
                                            filteredRules.map(rule => {
                                                const { isActive, measurementType, id, deviceGroupId, threshold, operation, actionParameter, actionType, threshold2 } = rule;
                                                    const device = devices.find(obj => obj.id === deviceGroupId)
                                                    const deviceId = device ? device.deviceId : "Not found";
                                                    const actionTypeLabel = actionTypes.find(obj => obj.value === actionType).label;
                                                    const truncatedActionParam = actionParameter.length > 30 ? actionParameter.slice(0, 30) + '...' : actionParameter
                                                    const operatorString = operators.find(obj => obj.value === operation).label;
                                                return (
                                                    <CustomTableRow key={id} className={classes.tableRow} hover onClick={() => push(`${location.pathname}/${id}`)}>
                                                        <CustomTableCell>
                                                            {actionTypeLabel + " to " + truncatedActionParam + " when " + measurementType + " is " + operatorString.toLowerCase() + ' ' + threshold + (operation === 4 ? ' and ' + threshold2 : '')}
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
                                                    No rules found
                                                </CustomTableCell>
                                            </CustomTableRow>
                                        }
                                    </CustomTableBody>
                                
                            }
                            {!rules &&
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

export default connect(mapStateToProps, { getRules, getDevices, push })(Rules);