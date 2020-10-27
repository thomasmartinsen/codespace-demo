import {  
    DEVICE_TYPES, 
} from "../actions/types";

export default function deviceTypes(state = null, action) {
    const { type, payload } = action;
    
    switch(type) {
        case DEVICE_TYPES.LOADED:
            return payload
        default:
            return state;
    }
}