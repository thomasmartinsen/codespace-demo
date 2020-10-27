import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Typography,
    ButtonBase,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin:`${theme.spacing(5)}px 0`,
        height:80,
        maxWidth:'100%',
        position:'relative',
        borderRadius:theme.spacing(1.25),
        border:`1px solid ${theme.palette.generalUi.borders}`,
        backgroundColor:props => props.warning ? theme.palette.defaults.red : theme.palette.defaults.white,
    },
    rootContent:{
        padding:props => props.topSubText ? `${theme.spacing(2)}px ${theme.spacing(4)}px` : `${theme.spacing(4)}px ${theme.spacing(4)}px`,
        width:`calc(100% - ${theme.spacing(26.5)}px)`,
    },
    truncatedText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    buttonBase: {
        width: '100%',
        height:'100%',
        justifyContent: 'left',
        textAlign: 'left'
    },
    image: {
        height:50,
        width:50,
        right:theme.spacing(5),
        position:'absolute',
        top:'50%',
        transform:'translateY(-50%)',
        opacity: props => props.warning ? 1 : 0.7
    }
}))

const DetailsComponent = (props) => {
    const classes = useStyles(props);
    const theme = useTheme();

    const { titleText, topSubText, bottomSubText, warning, action, Image } = props
    return (
        <>
            <div className={classes.root}>
                <ButtonBase focusRipple className={classes.buttonBase} onClick={action}>
                    <div className={classes.rootContent}>
                        {topSubText && 
                            <Typography 
                                variant="body1" 
                                className={classes.truncatedText}
                                style={{
                                    color: warning 
                                    ? theme.palette.text.white 
                                    : theme.palette.text.default
                            }}>
                                {topSubText}
                            </Typography>
                        }
                        <Typography 
                            variant="h3"  
                            className={classes.truncatedText}
                            style={{
                                color: warning 
                                ? theme.palette.text.white 
                                : theme.palette.text.default
                            }}>
                                {titleText}
                        </Typography>
                        {bottomSubText && 
                            <Typography 
                                variant="body1"  
                                className={classes.truncatedText}
                                style={{
                                    color: warning 
                                    ? theme.palette.text.white 
                                    : theme.palette.text.defaultSub
                            }}>
                                {bottomSubText}
                            </Typography>
                        }
                        {Image && 
                            <Image className={classes.image}/>
                        }
                    </div>
                </ButtonBase>
            </div>
        </>
    );
}

export default DetailsComponent;
