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
    Button,
    useTheme,
    useMediaQuery
} from '@material-ui/core';
import { CustomInputLabel, CustomTextField, CustomSelect } from '../../../../sub/restyled-mui/CustomInputs'
import { CustomButton } from '../../../../sub/restyled-mui/CustomButton'
import { getUsers, updateUser, createUser } from '../../../../../actions/users'
import moment from 'moment'
import { push } from 'connected-react-router'
import Navigation from '../../Navigation'

const roles = [
    {
        name:"User",
        id:"1"
    },
    {
        name:"Admin",
        id:"2"
    },
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
    },
}))

const mapStateToProps = (state, ownProps) => ({
    users:state.users,
    apiLoading:state.status.loading,
    client:state.client
});

const User = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const { users, getUsers, updateUser, createUser, client, match, push, apiLoading, creating } = props

    useEffect(() => {
        if(!users) {
            getUsers()
        }
    }, [users, getUsers])

    useEffect(() => {
        if(users) {
            if(creating) {
                setUser({
                    customerId:client.id,
                    verticalId:client.verticalId,
                    email:'',
                    name:'',
                    isActive:true,
                    roleType:1,
                    type:null,  
                })
                setLoading(false)
            } else {
                const user = users.find(x => x.id === match.params.id)
                if(user) {
                    setUser(user)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            }
        }
    }, [users, match.params.id, creating, client])

    useEffect(() => {
        if(!apiLoading && submitted) {
            push(`${client.defaultPath}/settings/users`)
            setSubmitted(false)
        }

    }, [apiLoading, submitted, push, client.defaultPath])

    const handleTextInputChange = (state) => (e) => {
        setUser({
            ...user,
            [state]:e.target.value
        })
    }

    const toggleProperty = (state) => (e) => {
        setUser({
            ...user,
            [state]:!user[state]
        })
    }

    const handleSubmit = () => {
        updateUser(user)
        setSubmitted(true)
    }

    const handleCreate = () => {
        createUser(user)
        setSubmitted(true)
    }

    const handleCancel = () => {
        push(`${client.defaultPath}/settings/users`)
    }

    const renderActionButtons = () => {
        return (
            <div className={classes.actionButtons}>  
                {!creating && <CustomButton
                    onClick={toggleProperty('isActive')}
                    color={!user.isActive ? 'secondary' : 'default'}
                    disableElevation
                    className={clsx(classes.activeButton, user.isActive ? classes.activeButtonInactive : null)}
                    variant={'contained'}
                >{user.isActive ? 'Deactivate' : 'Activate'}</CustomButton>}
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
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h4" className={classes.formSubtitle}>Details</Typography>
                        <CustomInputLabel>Name</CustomInputLabel>
                        <CustomTextField 
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                            type="text"
                            onChange={handleTextInputChange('name')}
                            value={user.name}
                        />
                        <CustomInputLabel>Email</CustomInputLabel>
                        <CustomTextField 
                            variant="outlined"
                            margin="dense"
                            size="small"
                            fullWidth
                            type="text"
                            onChange={handleTextInputChange('email')}
                            value={user.email}
                        />
                        <CustomInputLabel>Role</CustomInputLabel>
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
                                onChange={handleTextInputChange('roleType')}
                                value={user.roleType}

                            >
                                {roles.map(role => {
                                    return(
                                        <MenuItem key={role.id} value={role.id} className={classes.selectMenuItem}>
                                            {role.name}
                                        </MenuItem>
                                    )
                                })}
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
                user ?
                    <>
                        <div className={classes.headerContainer}>
                            <div className={classes.titleContainer}>
                                <Typography variant="h2" className={classes.title}>{creating ? 'New User' : user.name}</Typography>
                            </div>
                            <span className={classes.activeDot} style={{backgroundColor:user.isActive ? theme.palette.indicators.green : theme.palette.generalUi.borders}} />
                            {!smallScreen && renderActionButtons()}
                        </div>
                        {renderForm()}
                        {smallScreen && renderActionButtons()}
                   </>
                :
                <Typography variant="h2">User not found</Typography>
            }
        </Navigation>
    );
        
}

export default connect(mapStateToProps, { getUsers, updateUser, createUser, push })(User);