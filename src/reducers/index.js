import { combineReducers } from "redux";
import newsReducer from "./NewsReducer";
import articleReducer from "./ArticleReducer";
import newsErrorReducer from "./NewsErrorReducer";
import exhibitionsErrorReducer from "./ExhibitionsErrorReducer";
import ModalReducer from "./ModalReducer";
import RimBuildingImagesReducer from "./RimBuildingImagesReducer";
import TeamReducer from "./TeamReducer";
import exhibitionsReducer from "./ExhibitionsReducer";
import routesReducer from "./RoutesReducer";
import servicesReducer from "./ServicesReducer";
import CollectionsReducer from "./CollectionsReducer";
import CategoriesReducer from "./CategoriesReducer";

export default combineReducers({
  news: newsReducer,
  article: articleReducer,
  newsError: newsErrorReducer,
  exhibitionsError: exhibitionsErrorReducer,
  exhibitions: exhibitionsReducer,
  routes: routesReducer,
  services: servicesReducer,
  modal: ModalReducer,
  rimBuildingImages: RimBuildingImagesReducer,
  team: TeamReducer,
  collections: CollectionsReducer,
  categories: CategoriesReducer,
});
