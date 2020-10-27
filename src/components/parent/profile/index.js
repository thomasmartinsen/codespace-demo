import React from 'react';
import { 
    makeStyles
} from '@material-ui/core/styles';
//external components
import { Typography, Button } from '@material-ui/core';
import App from './components/App';

const useStyles = makeStyles((theme) => ({
    
}))

const Profile = (props) => {
    const classes = useStyles();
    const { logout } = props
    return (
        <>
            <App logout={logout} />
        </>
    );
        
}

export default Profile;