import {  
    DEVICE_GROUPS, 
} from "../actions/types";

export default function deviceGroups(state = null, action) {
    const { type, payload } = action;
    
    switch(type) {
        case DEVICE_GROUPS.LOADED:
            return payload
        default:
            return state;
    }
}