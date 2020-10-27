import React, { useState, useEffect} from 'react';
import clsx from 'clsx';
import { 
    makeStyles, 
    withStyles,
    useTheme
} from '@material-ui/core/styles';
import { 
    ListItemText, 
    ListItemIcon, 
    ListItem,
    List, 
    Drawer,
    useMediaQuery
} from '@material-ui/core';
import UIIcons from '../../../icons/ui-icons'
import ProfileIcon from './ProfileIcon';

const menuOverlayBreakpointDown = 'md'
const menuPushBreakpointUp = 'lg'

const CustomList = withStyles(theme => ({
    root: {
        padding:0,
        width:'100%'
    }
}))(List);

const CustomListItem = withStyles(theme => ({
    root: {
        width:'100%',
        color:theme.palette.menu.icons,
        paddingTop:theme.spacing(4),
        paddingBottom:theme.spacing(4)
    },
    gutters: {
        paddingLeft:0,
        paddingRight:0
    }
}))(ListItem);

const CustomListItemIcon = withStyles(theme => ({
    root: {
        color:theme.palette.menu.icons
    }
}))(ListItemIcon);

const CustomListItemText = withStyles(theme => ({
    primary: {
        color:theme.palette.menu.text
    }
}))(ListItemText);

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: props => props.maxDrawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerPaper: {
        overflowX: 'hidden',
        backgroundColor:theme.palette.menu.bg,
        top:'auto',
        bottom:0,
        [theme.breakpoints.down(menuOverlayBreakpointDown)]: {
            height:props => `100vh`,
            position:'relative',
        }, 
        [theme.breakpoints.up(menuPushBreakpointUp)]: {    
            height:props => `calc(100% - ${props.topbarHeight}px)`,
        },
    },
    [theme.breakpoints.up(menuPushBreakpointUp)]: {
        drawerOpen: {
            width: props => props.maxDrawerWidth,
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            width: props => props.minDrawerWidth,
        },
    },
    mobileMenuItem: {
        height:props => props.topbarHeight,
    },
    topList:{
        top:0,
        position:'absolute',
        [theme.breakpoints.up(menuPushBreakpointUp)]: {
            paddingTop:theme.spacing(2)
        }, 
    },
    topListItem:{
        top:0,
    },
    bottomList:{
        position:'absolute',
        bottom:0,
        paddingBottom:theme.spacing(2)
    },
    bottomListItem:{
        bottom:0,
    },
    menuIcon: {
        height:25,
        width:25,
        margin:'auto',
        '& path': {
            fill:theme.palette.defaults.white
        }
    },
    profileIcon: {
        height:35,
        width:35,
        margin:'auto',
    },
    listItemIcon: {
        minWidth:props => props.minDrawerWidth,
    }
}))

const Sidebar = (props) => {
    const classes = useStyles(props);
    const theme = useTheme();
    const menuOverlay = useMediaQuery(theme.breakpoints.down(menuOverlayBreakpointDown));
    const { open, goTo, handleDrawerChange } = props

    return (
        <>
            <Drawer
                variant={menuOverlay ? "temporary" : "permanent"}
                anchor={'left'}
                open={open}
                ModalProps={{ keepMounted: true }}
                onClose={handleDrawerChange}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx(classes.drawerPaper, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                
                <CustomList className={classes.topList}>
                    {menuOverlay && 
                        <CustomListItem className={clsx(classes.mobileMenuItem)} button key={'Menu'} onClick={handleDrawerChange}>
                            <CustomListItemIcon className={classes.listItemIcon}><UIIcons.BurgerMenuIcon className={classes.menuIcon} /></CustomListItemIcon>
                            <CustomListItemText primary={''} />
                        </CustomListItem>
                    }
                    <CustomListItem className={classes.topListItem} button key={'Map'} onClick={() => goTo('/')}>
                        <CustomListItemIcon className={classes.listItemIcon}><UIIcons.MapIcon className={classes.menuIcon} /></CustomListItemIcon>
                        <CustomListItemText primary={'Map Overview'} />
                    </CustomListItem>
                    <CustomListItem className={classes.topListItem} button key={'Devices'} onClick={() => goTo('/devices')}>
                        <CustomListItemIcon className={classes.listItemIcon}><UIIcons.SensorIcon className={classes.menuIcon} /></CustomListItemIcon>
                        <CustomListItemText primary={'Devices'} />
                    </CustomListItem>
                </CustomList>
                <CustomList className={classes.bottomList}>
                    <CustomListItem className={classes.bottomListItem} button key={'Settings'} onClick={() => goTo('/settings')}>
                        <CustomListItemIcon className={classes.listItemIcon}><UIIcons.SettingsIcon className={classes.menuIcon} /></CustomListItemIcon>
                        <CustomListItemText primary={'Settings'} />
                    </CustomListItem>
                    <CustomListItem className={classes.bottomListItem} button key={'Profile'} onClick={() => goTo('/profile')}>
                        <CustomListItemIcon className={classes.listItemIcon}><ProfileIcon className={classes.profileIcon} /></CustomListItemIcon>
                        <CustomListItemText primary={'Profile'} />
                    </CustomListItem>
                </CustomList>
            </Drawer>
        </>
    );
        
}

export default Sidebar;