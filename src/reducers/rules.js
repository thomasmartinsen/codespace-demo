import {  
    RULES, 
} from "../actions/types";

export default function rules(state = null, action) {
    const { type, payload } = action;
    
    switch(type) {
        case RULES.LOADED:
            return payload
        default:
            return state;
    }
}