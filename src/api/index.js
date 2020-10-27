import { authProvider, authenticationParameters } from '../utils/msalConfig'
import axios from 'axios'
import { store } from '../index'

const API_URL = process.env.REACT_APP_API_URL

export const tokenRequest = (config, customAxios) => {
    let axiosInstance = customAxios ? customAxios : axios
    return new Promise(function(resolve, reject) {
        const storeAuth = store.getState().auth
        if(!storeAuth.accessToken) {
            authProvider.getAccessToken()
            .then(res => {
                if(res.accessToken) {
                    resolve(request(config, axiosInstance, res.accessToken))
                }
            })
            .catch(silentError => {
                console.log(silentError)
                //Acquire token silent failure, and send an interactive request
                authProvider.acquireTokenPopup(authenticationParameters)
                .then(res => {
                    if(res.accessToken) {
                        resolve(axiosInstance.request({
                            ...config,
                            headers: {
                                ...config.headers,
                                Authorization: `Bearer ${res.accessToken}`
                            }
                        }))
                    }
                }).catch(error => {
                    // Acquire token interactive failure
                    console.log(error);
                    reject(error)
                });
            })
        } else {
            resolve(request(config, axiosInstance, storeAuth.accessToken.accessToken))
        }
    })
}

const request = (config, axiosInstance, accessToken) => {
    return axiosInstance.request({
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const Api = {
	getCustomer() {
		return(tokenRequest({
			method:'get',
			url:`${API_URL}/customer`,
		}))
    },
    getDevices() {
		return(tokenRequest({
			method:'get',
			url:`${API_URL}/devices`,
		}))
    },
    updateDevice(data) {
		return(tokenRequest({
			method:'post',
			url:`${API_URL}/devices`,
			data
		}))
    },
    getDeviceTypes() {
		return(tokenRequest({
			method:'get',
			url:`${API_URL}/devicetypes`,
		}))
    },
    getDeviceMeasurements(deviceId) {
		return(tokenRequest({
			method:'get',
			url:`${API_URL}/measurements/${deviceId}`,
		}))
    },
    getDeviceGroups() {
		return(tokenRequest({
			method:'get',
			url:`${API_URL}/devicegroups`,
		}))
    },
    updateDeviceGroup(data) {
		return(tokenRequest({
			method:'post',
			url:`${API_URL}/devicegroups`,
			data
		}))
	},
	getRules() {
		return(tokenRequest({
			method:'get',
			url:`${API_URL}/rules`,
		}))
	},
	updateRule(data) {
		return(tokenRequest({
			method:'post',
			url:`${API_URL}/rules`,
			data
		}))
	},
	getUsers() {
		return(tokenRequest({
			method:'get',
			url:`${API_URL}/users`,
		}))
	},
	updateUser(data) {
		return(tokenRequest({
			method:'post',
			url:`${API_URL}/users`,
			data
		}))
	},
};
export default Api;