import _ from 'lodash'
import {FETCH_RIM_BUILDING_IMAGES} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_RIM_BUILDING_IMAGES:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        default:
            return state;
    }
}
