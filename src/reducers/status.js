import { STATUS } from "../actions/types";

export const status = {
    loading:false,
    snackbar: {
        open: false,
        message: "",
        ok: null
    }
};

export default function statusReducer(state = status, action) {
    const { type, message } = action;
    switch(type) {
        case STATUS.FETCHING:
            return {
                ...state,
                loading: true,
                snackbar: {
                    open: false,
                    message: "",
                    ok: null
                }
            };
        case STATUS.SUCCESS:
            return {
                ...state,
                loading: false,
                snackbar: {
                    open: true,
                    message: message,
                    ok: true
                }
            };
        case STATUS.ERROR:
            return {
                ...state,
                loading: false,
                snackbar: {
                    open: true,
                    message: message,
                    ok: false
                }
            };
        case STATUS.RESET:
            return {
                ...state,
                loading: false,
                snackbar: {
                    open: false,
                    message: state.snackbar.message,
                    ok: state.snackbar.ok
                }
            };
        default:
            return state;

    }
}