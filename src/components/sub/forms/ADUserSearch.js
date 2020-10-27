


import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { 
    makeStyles
} from '@material-ui/core/styles';
import { tokenRequest } from '../../../api/index';
import { Autocomplete } from '@material-ui/lab'
import { Typography, InputLabel, TextField, CircularProgress, IconButton } from '@material-ui/core'
import UIIcons from '../../../icons/ui-icons';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(8, 17.5),
    },
    autocompleteMainText: {
        display:'block',
    },
    autocompleteSubText: {
        display:'block',
    },
    inputLabel: {
        marginTop:theme.spacing(2)
    },
    textFieldRoot: {
        width:'100%',
        
    },
    inputRoot: {
        backgroundColor:theme.palette.common.white
    }
}))

const ADUserSearch = (props) => {
    const classes = useStyles(props);
    const { push, location, match, azureUser, setAzureUser } = props
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    
    const [optionsId, setOptionsId] = useState([]);
    const [optionsDisplay, setOptionsDisplay] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState('');
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setOpen(false);
        setOptionsDisplay([]);
        setOptionsId([]);
        
    }, [textFieldValue]);
    
    const searchForADUsers = () => {   
        (async () => {
            setLoading(true)
            setOpen(true);
            if(textFieldValue.length > 0) {
                const response = await tokenRequest({ 
                    method: 'get', 
                    url:`https://graph.microsoft.com/v1.0/users?$filter=startswith(displayName,'${textFieldValue}') or startswith(mail,'${textFieldValue}')&$select=displayName,mail,id`
                });
                setOptionsDisplay(response.data.value);
                setOptionsId(response.data.value.map(x => x.id));
                
                setLoading(false)
            } else {
                setOptionsDisplay([])
                setOptionsId([]);
                setLoading(false)
            }
        })();
    }

    const handleInputChange = (e, value, reason) => {
        setAzureUser(value)
    }

    return (
        <>
            <InputLabel className={classes.inputLabel}>AD User</InputLabel>
            <Autocomplete
                style={{ width: 300 }}
                open={open}
                value={azureUser}
                onChange={handleInputChange}
                onClose={() => {
                    setOpen(false);
                }}
                onOpen={() => {
                    if(optionsId.length > 0){
                        setOpen(true);
                    }
                }}
                filterOptions={x => x}
                renderOption={option => {
                    return(
                        <div className={classes.autocompleteMainText}>
                            <Typography className={classes.autocompleteMainText} variant="body1">{optionsDisplay.find(x => x.id === option).displayName}</Typography>
                            <Typography className={classes.autocompleteSubText} variant="subtitle1">{optionsDisplay.find(x => x.id === option).mail}</Typography>
                        </div>
                    )
                }}
                noOptionsText={"No options"}
                getOptionSelected={(option, value) => option === value}
                getOptionLabel={(option) => option ? optionsDisplay.find(x => x.id === option).displayName : null}
                options={optionsId}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        value={textFieldValue}
                        onChange={(e) => setTextFieldValue(e.target.value)}
                        variant="outlined"
                        size="small"
                        margin="dense"
                        className={classes.textFieldRoot}
                        helperText={"Press Enter to search users in your AD"}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                searchForADUsers()
                                ev.preventDefault();
                            }
                          }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (<>{params.InputProps.endAdornment}</>),
                            // startAdornment: (
                            //     <>
                            //         {!loading ? 
                            //             <IconButton style={{padding: 4}}>
                            //                 <UIIcons.SearchIcon style={{height:20, width:20}}/>
                            //             </IconButton>
                            //         : null}
                            //         {loading ? <CircularProgress color="inherit" size={28} /> : null}
                            //     </>
                            // ),
                            className:classes.inputRoot
                        }}
                    />
                )}
            />
        </>
    )
  }

export default withRouter(ADUserSearch);


