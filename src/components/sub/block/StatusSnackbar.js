import React from 'react';
import { connect } from "react-redux";
//internal constants
import { STATUS } from '../../../actions/types'
//external components
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
//internal actions
import { changeStatus } from '../../../actions/status'

function mapDispatchToProps(dispatch) {
    return { 
        changeStatus: (path) => dispatch(changeStatus(path)),
    };
  }
  
const mapStateToProps = (state, ownProps) => {
    return { 
        snackbar:state.status.snackbar
    };
};


class StatusSnackbarConnected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { changeStatus } = this.props
        const { open, ok, message } = this.props.snackbar
        return(
            <Snackbar open={open} autoHideDuration={6000} onClose={() => changeStatus(STATUS.RESET)}>
                <Alert onClose={() => changeStatus(STATUS.RESET)} variant="filled" severity={ok ? "success" : "error"}>
                    {message}
                </Alert>
            </Snackbar>
        )
    }
}


const StatusSnackbar = connect(
    mapStateToProps,
    mapDispatchToProps,
    )(StatusSnackbarConnected);

export default StatusSnackbar;