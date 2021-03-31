import {combineReducers} from "redux";
import newsReducer from './NewsReducer'
import ModalReducer from './ModalReducer'
import RimBuildingImagesReducer from "./RimBuildingImagesReducer";
import TeamReducer from "./TeamReducer";
import exhibitionsReducer from "./ExhibitionsReducer";


export default combineReducers({
    news: newsReducer,
    exhibitions: exhibitionsReducer,
    modal: ModalReducer,
    rimBuildingImages: RimBuildingImagesReducer,
    team: TeamReducer
})
