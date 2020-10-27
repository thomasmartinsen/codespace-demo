import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const CustomButton = withStyles(theme => ({
    root: {
        borderRadius:theme.spacing(1.25),
        border:`1px solid ${theme.palette.generalUi.borders}`,
        height:theme.spacing(8),
        width:theme.spacing(24)
    },
}))(Button);