import {  
    USERS, 
} from "../actions/types";

export default function users(state = null, action) {
    const { type, payload } = action;
    
    switch(type) {
        case USERS.LOADED:
            return payload
        default:
            return state;
    }
}