import _ from 'lodash'
import {FETCH_ARTICLE,FETCH_NEWS} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_ARTICLE:
            return {...state, [action.payload.id]: action.payload}
        default:
            return state;
    }
}
