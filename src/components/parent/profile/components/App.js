import React, { useEffect, useCallback } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
    makeStyles
} from '@material-ui/core/styles';
import { Typography, Button, Divider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(8, 17.5),
    },
    logoutButton: {
        margin: theme.spacing(4, 0)
    }
}))

const App = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const { logout } = props

    return (
        <>
            <div className={classes.content}>
                <Typography variant="h2">Profile</Typography>
                <Divider />
                <Button 
                    variant="outlined" 
                    color="primary" 
                    className={classes.logoutButton}
                    onClick={logout}
                >
                    Logout
                </Button>
            </div>
        </>
    )
  }

export default withRouter(App);


