import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Typography,
    Toolbar,
    AppBar
} from '@material-ui/core';
import { topbarHeight } from '../navigation/Navigation'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1,
        padding:theme.spacing(0, 8),
        borderBottom:`1px solid ${theme.palette.generalUi.borders}`,
        backgroundColor:theme.palette.generalUi.background
    },
    title: {
        flexGrow:1,
        fontWeight:400
    },
    appbarContainer: {
        top:topbarHeight,
        position:'sticky',
        width:'100%',
        zIndex:1
    }
}))

const ActionBar = (props) => {
    const classes = useStyles(props);
    const theme = useTheme();

    return (
        <>
            <div className={classes.appbarContainer}>
                <Toolbar className={classes.root}>
                    <Typography variant="h3" className={classes.title}>
                        {props.title}
                    </Typography>
                    {props.children}
                </Toolbar>
            </div>
        </>
    );
}

export default ActionBar;
