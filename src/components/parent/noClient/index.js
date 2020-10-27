import React from 'react';
import { 
    makeStyles
} from '@material-ui/core/styles';
//external components
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
}))

const NoClient = (props) => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h2">Client ID not found - please extend the url with your client ID</Typography>
        </>
    );
        
}

export default NoClient;