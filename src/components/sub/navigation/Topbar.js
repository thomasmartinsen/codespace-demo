import React from 'react';
import { 
    makeStyles, 
} from '@material-ui/core/styles';
import { 
    AppBar, 
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core';
import UIIcons from '../../../icons/ui-icons';
import config from '../../../config.json';
import { topbarHeight } from './Navigation'

const useStyles = makeStyles((theme) => ({
    appBar: {
        transform: 'translateZ(0)',
        backgroundColor:theme.palette.menu.bg,
        borderBottom:`1px solid ${theme.palette.menu.border}`,
        borderLeft:`1px solid ${theme.palette.menu.border}`,
        width: '100%',
        height: props => props.topbarHeight,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbar: {
        paddingLeft:0,
        height:topbarHeight
    },
    headerText: {
        marginLeft:theme.spacing(5.5),
        color:theme.palette.menu.text,
        textTransform:'uppercase'
    },
    menuIcon: {
        height:25,
        margin:'auto',
        width:25,
        '& path': {
            fill:theme.palette.defaults.white
        }
    },  
    menuButton: {
        minWidth:props => props.minDrawerWidth,
        color:theme.palette.menu.icons
    }
}))

const Topbar = (props) => {
    const classes = useStyles(props);
    const { handleDrawerChange } = props
    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                className={classes.appBar}
                >
                <Toolbar className={classes.toolbar}>
                    <IconButton onClick={handleDrawerChange} className={classes.menuButton}>
                        <UIIcons.BurgerMenuIcon className={classes.menuIcon} />
                    </IconButton>
                    <Typography variant="h3" noWrap className={classes.headerText}>
                        {config.appTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
        
}

export default Topbar;