import { DEVICE_GROUPS } from './types'
import Api from '../api'
import { STATUS } from './types'
import { changeStatus } from './status'
import { handleError } from '../api/error'

export const getDeviceGroups = () => {
    return (dispatch) => {
        return Api.getDeviceGroups()
            .then(res => {
                dispatch({ type: DEVICE_GROUPS.LOADED, payload: res.data });
            });
    }
}


export const updateDeviceGroup = (data) => {
    return (dispatch, getState) => {
        dispatch(changeStatus(STATUS.FETCHING))
        return Api.updateDeviceGroup(data)
            .then(res => {
                const deviceGroups = getState().deviceGroups
                deviceGroups.splice(deviceGroups.findIndex(x => x.id === data.id), 1, data)
                dispatch({ type: DEVICE_GROUPS.UPDATED, payload: deviceGroups });
                dispatch(changeStatus(STATUS.SUCCESS, 'Device Group updated successfully'))
            })
        .catch(err => {
            handleError(err)
        })
    }
}


export const createDeviceGroup = (data) => {
    return (dispatch, getState) => {
        dispatch(changeStatus(STATUS.FETCHING))
        return Api.updateDeviceGroup(data)
            .then(res => {
                const newData = {
                    ...data,
                    id:res.data
                }
                const deviceGroups = getState().deviceGroups
                deviceGroups.push(newData)
                dispatch({ type: DEVICE_GROUPS.CREATED, payload: deviceGroups });
                dispatch(changeStatus(STATUS.SUCCESS, 'Device Group created successfully'))
            })
            .catch(err => {
                handleError(err)
            })
    }
}