import { DEVICES, DEVICE_TYPES } from './types'
import Api from '../api'
import { STATUS } from './types'
import { changeStatus } from './status'
import { handleError } from '../api/error'

export const getDevices = () => {
    return (dispatch) => {
        return Api.getDevices()
            .then(res => {
                dispatch({ type: DEVICES.LOADED, payload: res.data });
            });
    }
}


export const updateDevice = (data) => {
    return (dispatch, getState) => {
        dispatch(changeStatus(STATUS.FETCHING))
        return Api.updateDevice(data)
            .then(res => {
                const devices = getState().devices
                devices.splice(devices.findIndex(x => x.id === data.id), 1, data)
                dispatch({ type: DEVICES.UPDATED, payload: devices });
                dispatch(changeStatus(STATUS.SUCCESS, 'Device updated successfully'))
            })
            .catch(err => {
                handleError(err)
            })
    }
}


export const createDevice = (data) => {
    return (dispatch, getState) => {
        dispatch(changeStatus(STATUS.FETCHING))
        return Api.updateDevice(data)
            .then(res => {
                const newData = {
                    ...data,
                    id:res.data
                }
                let devices = getState().devices
                devices.push(newData)
                dispatch({ type: DEVICES.CREATED, payload: devices });
                dispatch(changeStatus(STATUS.SUCCESS, 'Device created successfully'))
            })
            .catch(err => {
                handleError(err)
            })
    }
}