import {  
    DEVICES, 
} from "../actions/types";

export default function devices(state = null, action) {
    const { type, payload } = action;
    
    switch(type) {
        case DEVICES.LOADED:
            return payload
        default:
            return state;
    }
}