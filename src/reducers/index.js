import {combineReducers} from "redux";
import newsReducer from './NewsReducer'
import ModalReducer from './ModalReducer'


export default combineReducers({
    news: newsReducer,
    modal: ModalReducer
})
