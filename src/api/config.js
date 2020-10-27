import axios from 'axios'

const apikey = process.env.REACT_APP_API_KEY

export const setClientApi = (clientId) => {
    axios.defaults.headers.common['clientId'] = clientId
    axios.defaults.headers.common['x-apikey'] = apikey 
}