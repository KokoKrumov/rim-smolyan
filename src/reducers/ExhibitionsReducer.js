import _ from 'lodash'
import {FETCH_EXHIBITIONS, FETCH_EXHIBITIONS_ARTICLE} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_EXHIBITIONS:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_EXHIBITIONS_ARTICLE:
            return {...state, [action.payload.id]: action.payload}
        default:
            return state;
    }
}
