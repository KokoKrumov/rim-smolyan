import {
    FETCH_REDIRECT_MODAL,
    FETCH_LASLO_MODAL
} from '../actions/types'


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_REDIRECT_MODAL:
            return {...state, type: action.data, modalIsOpen: true}
        case FETCH_LASLO_MODAL:
            return {...state, type: action.data, modalIsOpen: true}
        default:
            return state;
    }
}
