import { authProvider } from './msalConfig'
import { tokenRequest } from '../api'
import { authenticationParameters } from "../utils/msalConfig";

export function authenticateViaGroup(authGroupId) {
    return new Promise(function(resolve, reject) {
      tokenRequest({
        method: 'GET',
        url:'https://graph.microsoft.com/v1.0/me/memberOf',
        headers: {
          Accept : 'application/json'
        }
      })
      .then(res => {
        if(res.data.value.filter(obj => (obj.id === authGroupId)).length > 0) {
          resolve(true);
        } else {
          if(res.data.hasOwnProperty('@odata.nextLink')) {
            authenticateViaGroup(res.data['@odata.nextLink'])
          } else {
            resolve(false);
          }
        }
      })
      .catch(err => {
        console.log(err)
        reject(false)
      })
    })
}

export function authenticateViaUsers() {
  return new Promise(function(resolve, reject) {
    tokenRequest({
      method: 'get',
      url:''
    })
    .then(json => {
      //if user exists, resolve
      //else, reject
    })
    .catch(err => {
      console.log(err)
      reject(false)
    })
  })
}