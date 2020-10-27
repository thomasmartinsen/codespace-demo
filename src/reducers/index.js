import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import status from './status'
import auth from './auth'
import client from './client'
import devices from './devices'
import rules from './rules'
import users from './users'
import deviceGroups from './deviceGroups'
import deviceTypes from './deviceTypes'
import measurementTypes from './measurementTypes'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth,
    client,
    status,
    devices,
    rules,
    users,
    deviceGroups,
    deviceTypes,
    measurementTypes,
  });

export default createRootReducer;