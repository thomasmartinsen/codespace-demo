import {  
    MEASUREMENT_TYPES, 
} from "../actions/types";

export default function measurementTypes(state = null, action) {
    const { type, payload } = action;
    
    switch(type) {
        case MEASUREMENT_TYPES.LOADED:
            return payload
        default:
            return state;
    }
}