import {  
    CLIENT, 
} from "../actions/types";

export default function clients(state = null, action) {
    const { type, payload } = action;
    switch(type) {
        case CLIENT.LOADED:
            return payload
        default:
            return state;
    }
}