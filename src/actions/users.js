import { USERS } from './types'
import Api from '../api'
import { STATUS } from './types'
import { changeStatus } from './status'
import { handleError } from '../api/error'

export const getUsers = () => {
    return (dispatch) => {
        return Api.getUsers()
            .then(res => {
                dispatch({ type: USERS.LOADED, payload: res.data });
            });
    }
}


export const updateUser = (data) => {
    return (dispatch, getState) => {
        dispatch(changeStatus(STATUS.FETCHING))
        return Api.updateUser(data)
            .then(res => {
                const users = getState().users
                users.splice(users.findIndex(x => x.id === data.id), 1, data)
                dispatch({ type: USERS.UPDATED, payload: users });
                dispatch(changeStatus(STATUS.SUCCESS, 'User updated successfully'))
            })
            .catch(err => {
                handleError(err)
            })
    }
}


export const createUser = (data) => {
    return (dispatch, getState) => {
        dispatch(changeStatus(STATUS.FETCHING))
        return Api.updateUser(data)
            .then(res => {
                const newData = {
                    ...data,
                    id:res.data
                }
                let users = getState().users
                users.push(newData)
                dispatch({ type: USERS.CREATED, payload: users });
                dispatch(changeStatus(STATUS.SUCCESS, 'User created successfully'))
            })
            .catch(err => {
                handleError(err)
            })
    }
}