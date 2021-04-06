import _ from 'lodash'
import {FETCH_SERVICES} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_SERVICES:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        default:
            return state;
    }
}
