import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux'
import { 
    makeStyles,
} from '@material-ui/core/styles';
import {  
    Toolbar,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom'
import { push } from 'connected-react-router'

import Topbar from './Topbar'
import Sidebar from './Sidebar'

const maxDrawerWidth = 224;
const minDrawerWidth = 65;
export const topbarHeight = 65;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    display:'flex',
    flexDirection:'column'
  },
  content: {
    display:'flex',
    flexDirection:'column',
    flex:1,
    position: 'relative',
    minHeight:`calc(100vh - ${topbarHeight - 1}px)`
  },
  toolbar:{
    height: topbarHeight
  }
}));


const Navigation = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const location = useLocation();
  const store = useStore();
  const globalStore = store.getState()
  const [open, setOpen] = useState(false);

  const handleDrawerChange = () => {
    setOpen(!open);
  };

  const menuLink = (path) => {
    dispatch(push(`${globalStore.client.defaultPath}${path}`))
  }

  return (
    <div className={classes.root}>
      <Topbar open={open} handleDrawerChange={handleDrawerChange} topbarHeight={topbarHeight} minDrawerWidth={minDrawerWidth} maxDrawerWidth={maxDrawerWidth} />
      <Sidebar open={open} goTo={menuLink} handleDrawerChange={handleDrawerChange} topbarHeight={topbarHeight} minDrawerWidth={minDrawerWidth} maxDrawerWidth={maxDrawerWidth} />
      <main className={classes.main}>
        <Toolbar className={classes.toolbar} />
        <div className={classes.content}>
          {props.children}
        </div>
      </main>
    </div>
  );
}

export default Navigation;