import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Typography,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    useMediaQuery
} from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import SyncIcon from '@material-ui/icons/Sync';
import UIIcons from '../../../icons/ui-icons';
import ActionBar from '../../sub/block/ActionBar'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'column',
        flex:1
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        left:'auto',
        top:'auto',
        width: drawerWidth,
        backgroundColor:'transparent'
    },
    drawerContainer: {
        flex: 1,
        display:'flex'
    },
    content: {
        padding: theme.spacing(4, 8),
        flexGrow:1,
        display:'flex',
        flexDirection:'column'
    },
    menuIcon: {
        height:25,
        margin:'auto',
        width:25,
        '& path': {
            fill:theme.palette.generalUi.icons
        }
    },
    selected: {
        backgroundColor:'rgba(0,0,0,0.08)'
    },
    listItemText: {
        paddingLeft:theme.spacing(2)
    }
}));

const Navigation = (props) => {
    const classes = useStyles();
    const { push, client, location, renderActionButtons } = props


    const pages = [
        {
            path:`${client.defaultPath}/settings/devices`,
            name:'Devices',
            Icon: UIIcons.SensorIcon
        },
        {
            path:`${client.defaultPath}/settings/device-groups`,
            name:'Device Groups',
            Icon: UIIcons.SensorIcon
        },
        {
            path:`${client.defaultPath}/settings/users`,
            name:'Users',
            Icon: UIIcons.UserIcon
        },
        {
            path:`${client.defaultPath}/settings/rules`,
            name:'Rules',
            Icon: UIIcons.UserIcon
        },
    ]

    return (
        <div className={classes.root}>
            <ActionBar title={'Settings'}>
                {renderActionButtons ? renderActionButtons() : null}
            </ActionBar>
            <main className={classes.drawerContainer}>
                <Drawer
                    className={classes.drawer}
                    variant={"permanent"}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <List>
                        {pages.map(page => {
                            const { path, name, Icon } = page
                            const selected = Boolean(location.pathname.includes(path))
                            return(
                                <ListItem key={path} button={!selected} className={selected ? classes.selected : null} onClick={() => push(path)}>
                                    {/* <ListItemIcon><Icon className={classes.menuIcon}/></ListItemIcon> */}
                                    <ListItemText primary={name} className={classes.listItemText} />
                                </ListItem>
                            )
                        })}
                    </List>
                </Drawer>
                <div className={classes.content}>
                    {props.children}
                </div>
            </main>
        </div>
    );
}

export default withRouter(Navigation)