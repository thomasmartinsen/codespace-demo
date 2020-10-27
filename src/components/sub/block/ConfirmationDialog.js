import React from 'react';
import { 
    makeStyles
} from '@material-ui/core/styles';
import { Typography, Dialog, DialogActions, DialogContent, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    textContent: {
        whiteSpace:'pre-wrap'
    },
}))

const ConfirmationDialog = (props) => {
    const classes = useStyles(props);
    const { onClose, text, onCloseConfirm, onCloseNoConfirm, open, ...other } = props;

    const handleCancel = () => {
        onCloseNoConfirm();
    };

    const handleOk = () => {
        onCloseConfirm();
    };

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogContent className={classes.textContent}>
                <Typography variant='body1'>{text}</Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus variant="outlined" onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button variant="outlined" onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog