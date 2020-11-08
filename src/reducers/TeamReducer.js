import _ from 'lodash'
import {FETCH_TEAM} from '../actions/types'

let INITIAL_STATE = {
    headmaster: [],
    archeology: [],
    history: [],
    ethnography: [],
    scientific: [],
    publicRelations: [],
    administration: [],

}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_TEAM:
            for (const property in INITIAL_STATE) {
                action.payload.filter(obj => {
                    if(obj.department === property){
                         INITIAL_STATE[`${property}`].push(obj)
                    }
                })
            }
            return {...state}
        default:
            return state;
    }
}
