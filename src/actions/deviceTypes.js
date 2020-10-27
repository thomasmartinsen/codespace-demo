import { DEVICE_TYPES } from './types'
import Api from '../api'

export const getDeviceTypes = () => {
    return (dispatch) => {
        return Api.getDeviceTypes()
            .then(res => {
                dispatch({ type: DEVICE_TYPES.LOADED, payload: res.data });
            });
    }
}