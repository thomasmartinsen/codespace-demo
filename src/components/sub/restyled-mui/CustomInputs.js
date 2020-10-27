import { TextField, InputLabel, Select } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const CustomInputLabel = withStyles(theme => ({
    root: {
        marginTop:theme.spacing(2),
        fontSize:13,
        fontWeight:400,
        color:theme.palette.text.defaultSub
    },
}))(InputLabel);

export const CustomTextField = withStyles(theme => ({

}))(TextField);

export const CustomSelect = withStyles(theme => ({
    select: {
        '&:focus': {
            backgroundColor:theme.palette.common.white
        }
    },
}))(Select);