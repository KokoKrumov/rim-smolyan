import {combineReducers} from "redux";
import newsReducer from './NewsReducer'
import ModalReducer from './ModalReducer'
import RimBuildingImagesReducer from "./RimBuildingImagesReducer";
import TeamReducer from "./TeamReducer";
import exhibitionsReducer from "./ExhibitionsReducer";
import routesReducer from "./RoutesReducer";
import servicesReducer from "./ServicesReducer";


export default combineReducers({
    news: newsReducer,
    exhibitions: exhibitionsReducer,
    routes: routesReducer,
    services: servicesReducer,
    modal: ModalReducer,
    rimBuildingImages: RimBuildingImagesReducer,
    team: TeamReducer
})
