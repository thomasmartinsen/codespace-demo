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
import { getUsers } from '../../../../../actions/users'
import Navigation from '../../Navigation'
import UIIcons from '../../../../../icons/ui-icons'
import { push } from 'connected-react-router'

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
    users:state.users,
    client:state.client
});

const Users = (props) => {
    const classes = useStyles();
    const theme = useTheme()
    const [search, setSearch] = useState('')
    const { users, getUsers, client, push, location } = props

    useEffect(() => {
        if(!users) {
            getUsers()
        }
    }, [users, getUsers])

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

    const searchFilter = (user) => {
        const regex = new RegExp('\\b' + search, 'i');
        return regex.test(`${user.name} ${user.email}`);
    }
    const filteredUsers = users ? users.filter(x => searchFilter(x)) : []
    return (
        <Navigation push={push} client={client}>
            <div className={classes.headerContainer}>
                <Typography variant="h2">Users</Typography>
                <CustomTextField 
                    variant="outlined"
                    margin="dense"
                    size="small"
                    type="text"
                    placeholder="Filter Users"
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
                                <CustomTableCell style={{width:'30%'}}>
                                    Name
                                </CustomTableCell>
                                <CustomTableCell>
                                    Email
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
                            {users &&
                                    <CustomTableBody>
                                        {filteredUsers.length > 0 ?
                                            filteredUsers.map(user => {
                                                const { name, id, email, isActive } = user
                                                return (
                                                    <CustomTableRow key={id} className={classes.tableRow} hover onClick={() => push(`${location.pathname}/${id}`)}>
                                                        <CustomTableCell style={{width:'30%'}}>
                                                            {name}
                                                        </CustomTableCell>
                                                        <CustomTableCell>
                                                            {email}
                                                        </CustomTableCell>
                                                        <CustomTableCell className={classes.activeDotContainer}style={{width:64}}>
                                                            <span className={classes.activeDot} style={{backgroundColor:isActive ? theme.palette.indicators.green : theme.palette.generalUi.borders}} />
                                                        </CustomTableCell>
                                                    </CustomTableRow>
                                                )
                                            })
                                        :
                                            <CustomTableRow className={classes.tableRow}>
                                                <CustomTableCell>
                                                    No users found
                                                </CustomTableCell>
                                            </CustomTableRow>
                                        }
                                    </CustomTableBody>
                                
                            }
                            {!users &&
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

export default connect(mapStateToProps, { getUsers, push })(Users);