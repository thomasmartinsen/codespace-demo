import React from 'react';
import { Select, withStyles, MenuItem, InputLabel, FormControl, Typography } from '@material-ui/core'
import { CustomSelect } from './CustomInputs'

const styles = theme => ({
    formControl: {
        width:288
    },
    colorSelectDot: {
        height:19,
        width:19,
        borderRadius:'50%',
        display:'inline-block'
    },
    colorSelectText: {
        display:'inline-block',
        paddingLeft:10,
        fontSize:16,
        fontWeight:400,
        color:'rgba(0,0,0,0.87)'
    },
    menu: {
        padding:0,
        width:288
    },
    list: {
        padding:0
    },
    menuItem: {
        borderBottom:'none',
        display:'inline-block',
        padding:11
    },
    input: {
        display:'flex',
        alignItems:'center',

    }
})

const ColorSelect = (props) => {
    const { classes, value, onChange, options } = props;
    return (
        <>
         <FormControl size="small" margin="dense" variant="outlined" className={classes.formControl} >
            <CustomSelect
                labelId="color-select-label"
                id="color-select"
                variant="outlined"
                
                renderValue={item => {
                    return(
                        <>
                            <div className={classes.colorSelectDot} style={{backgroundColor:item}}/>
                            <Typography className={classes.colorSelectText} variant="h4">{item}</Typography>
                        </>
                    )
                }}
                value={value}
                options={options}
                onChange={onChange}
                inputProps={{
                    margin:'dense',
                    className:classes.input
                }}
                MenuProps={{
                    classes:{
                        paper:classes.menu,
                        list:classes.list
                    },
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                      },
                      getContentAnchorEl: null
                }}
                
            >
                {options.map(item => {
                    return(
                        <MenuItem key={item} value={item} className={classes.menuItem}>
                            <div className={classes.colorSelectDot} style={{backgroundColor:item}}/>
                        </MenuItem>
                    )
                })}
                
            </CustomSelect>
        </FormControl>
     
        </>                
    )
}

export default  withStyles(styles)(ColorSelect);