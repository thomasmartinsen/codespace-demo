import { CLIENT } from './types'
import Api from '../api'

export const setClient = (clientId, defaultClient) => {
    return (dispatch) => {
        return Api.getCustomer(clientId)
            .then(res => {
                const client = {
                    ...res.data,
                    defaultPath:defaultClient ? '' : `/${res.data.clientId}`
                }
                dispatch({ type: CLIENT.LOADED, payload: client });
            });
    }
}