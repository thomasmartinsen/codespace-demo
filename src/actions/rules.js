import { RULES } from './types'
import Api from '../api'
import { STATUS } from './types'
import { changeStatus } from './status'
import { handleError } from '../api/error'

export const getRules = () => {
    return (dispatch) => {
        return Api.getRules()
            .then(res => {
                dispatch({ type: RULES.LOADED, payload:res.data });
            });
    }
}


export const updateRule = (data) => {
    return (dispatch, getState) => {
        dispatch(changeStatus(STATUS.FETCHING))
        return Api.updateRule(data)
            .then(res => {
                const rules = getState().rules
                rules.splice(rules.findIndex(x => x.id === data.id), 1, data)
                dispatch({ type: RULES.UPDATED, payload: rules });
                dispatch(changeStatus(STATUS.SUCCESS, 'Rule updated successfully'))
            })
            .catch(err => {
                handleError(err)
            })
    }
}


export const createRule = (data) => {
    return (dispatch, getState) => {
        dispatch(changeStatus(STATUS.FETCHING))
        return Api.updateRule(data)
            .then(res => {
                const newData = {
                    ...data,
                    id:res.data
                }
                let rules = getState().rules
                rules.push(newData)
                dispatch({ type: RULES.CREATED, payload: rules });
                dispatch(changeStatus(STATUS.SUCCESS, 'Rule created successfully'))
            })
            .catch(err => {
                handleError(err)
            })
    }
}