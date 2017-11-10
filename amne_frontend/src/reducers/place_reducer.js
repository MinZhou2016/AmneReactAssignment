import { FETCH_ESTATES, FETCH_LOCATION } from '../actions/index'

const INITIAL_STATE = {estates: [], input_addres: []}

export default function(state=INITIAL_STATE, action){
    switch (action.type) {
        case FETCH_ESTATES:
            return {...state, estates: action.payload}
        case FETCH_LOCATION:
            return {...state, input_addres: action.payload}
        default:
            return state;
    }
}