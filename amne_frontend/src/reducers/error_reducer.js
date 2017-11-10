import { SHOW_ERROR } from '../actions/index'

const INITIAL_STATE = {error: ''}

export default function(state=INITIAL_STATE, action){
    switch (action.type) {
        case SHOW_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}