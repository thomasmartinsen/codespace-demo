import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { 
    makeStyles, 
    withStyles,
    useTheme
} from '@material-ui/core/styles';
import { tokenRequest } from '../../../api/index'
import { 
    CircularProgress
} from '@material-ui/core';
import UIIcons from '../../../icons/ui-icons'

const useStyles = makeStyles((theme) => ({
    image: {
        width:'100%',
        borderRadius:'50%'
    },
    icon: {
        height:25,
        width:25,
        transform:'translate(-50%, -50%)',
        top:'50%',
        left:'50%',
        position:'absolute',
        margin:'auto',
        '& path': {
            fill:theme.palette.defaults.white
        }
    },
}))

const ProfileIcon = (props) => {
    const classes = useStyles(props);
    const theme = useTheme();
    const [photo, setPhoto] = useState(null)
    const { className } = props
    const [didMount, setDidMount] = useState(false); 

    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, [])

    useEffect(() => {
        tokenRequest({
            method:'get',
            url: 'https://graph.microsoft.com/v1.0/me/photo/$value',
            responseType: 'arraybuffer'
        })
        .then(response => {
            const encoded = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(response.data, 'binary').toString('base64')
            setPhoto(encoded)
        })
        .catch(err => {
            console.log(err)
            setPhoto(false)
        })
    }, [])

    return (
        <>
            <div className={className}>
                {photo &&
                    <>
                        <img className={classes.image} src={photo} alt={'user profile'} />
                    </>
                }
                {photo === false &&
                    <UIIcons.UserIcon className={classes.icon} />
                }
                {photo === null &&
                    <CircularProgress size={'100%'} />
                }
            </div>
            
        </>
    );
        
}

export default ProfileIcon;