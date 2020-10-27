import { changeStatus } from '../actions/status'
import { STATUS } from '../actions/types'
import { store } from '../index'

export const handleError = (error) => {
    const dispatch = store.dispatch
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        // supporting current microsoft subscription api errors
        let text = "";
        if(error.response.statusText !== "") {
            text = error.response.statusText
        } else if(error.response.data.error) {
            text = error.response.data.error.code
        } else {
            text = "Unknown"
        }
        dispatch(changeStatus(STATUS.ERROR, "Error: " + error.response.status + ' ' + text))
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        dispatch(changeStatus(STATUS.ERROR, "Error: " + error.request.status + ' ' + error.request.statusText))
    } else {
        // Something happened in setting up the request and triggered an Error
        dispatch(changeStatus(STATUS.ERROR, "Error: " + error.message))
    }
    
}