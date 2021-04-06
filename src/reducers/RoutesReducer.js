import _ from 'lodash'
import {FETCH_ROUTES} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ROUTES:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        default:
            return state;
    }
}
