import {
    FETCH_REDIRECT_MODAL,
    FETCH_NEDELOV_MODAL,
    CLOSE_NEDELOV_MODAL,
    CLOSE_REDIRECT_MODAL,
    FETCH_TEAM_MODAL,
    CLOSE_TEAM_MODAL
} from '../actions/types'


export default (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case FETCH_REDIRECT_MODAL:
            return {...state, type: action.data, url: action.url, modalIsOpen: true}
        case CLOSE_REDIRECT_MODAL:
            return {...state, type: action.data, url: action.url, modalIsOpen: false}
        case FETCH_NEDELOV_MODAL:
            return {...state, type: action.data, modalIsOpen: true}
        case CLOSE_NEDELOV_MODAL:
            return {...state, type: action.data, modalIsOpen: false}
        case FETCH_TEAM_MODAL:
            return {...state, type: action.data, user: action.user, modalIsOpen: true}
        case CLOSE_TEAM_MODAL:
            return {...state, type: action.data, modalIsOpen: false}
        default:
            return state;
    }
}
