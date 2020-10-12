import {combineReducers} from "redux";
import newsReducer from './NewsReducer'


export default combineReducers({
    news: newsReducer
})
