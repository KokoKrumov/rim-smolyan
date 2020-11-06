import {combineReducers} from "redux";
import newsReducer from './NewsReducer'
import ModalReducer from './ModalReducer'
import RimBuildingImagesReducer from "./RimBuildingImagesReducer";
import TeamReducer from "./TeamReducer";


export default combineReducers({
    news: newsReducer,
    modal: ModalReducer,
    rimBuildingImages: RimBuildingImagesReducer,
    team: TeamReducer
})
