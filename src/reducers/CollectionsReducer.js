import {FETCH_COLLECTIONS_ARCHEOLOGY, FETCH_COLLECTIONS_MAIN, FETCH_COLLECTIONS_VIRTUAL} from '../actions/types'

let INITIAL_STATE = {
    main: [],
    virtual: [],
    byType: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COLLECTIONS_MAIN:
            return {...state, main: action.payload}
        case FETCH_COLLECTIONS_VIRTUAL:
            return {...state, virtual: action.payload}
        case FETCH_COLLECTIONS_ARCHEOLOGY:
            return {...state, byType: action.payload}
        default:
            return state;
    }
}
