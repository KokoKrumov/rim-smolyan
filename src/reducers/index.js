import newsReducer from "./NewsReducer";
import { combineReducers } from "redux";
import TeamReducer from "./TeamReducer";
import ModalReducer from "./ModalReducer";
import routesReducer from "./RoutesReducer";
import articleReducer from "./ArticleReducer";
import servicesReducer from "./ServicesReducer";
import newsErrorReducer from "./NewsErrorReducer";
import CategoriesReducer from "./CategoriesReducer";
import CollectionsReducer from "./CollectionsReducer";
import exhibitionsReducer from "./ExhibitionsReducer";
import exhibitionsErrorReducer from "./ExhibitionsErrorReducer";
import exhibitionArticleReducer from "./ExhibitionArticleReducer";
import RimBuildingImagesReducer from "./RimBuildingImagesReducer";

export default combineReducers({
  news: newsReducer,
  team: TeamReducer,
  modal: ModalReducer,
  routes: routesReducer,
  article: articleReducer,
  services: servicesReducer,
  newsError: newsErrorReducer,
  categories: CategoriesReducer,
  exhibitions: exhibitionsReducer,
  collections: CollectionsReducer,
  exhibitionsError: exhibitionsErrorReducer,
  rimBuildingImages: RimBuildingImagesReducer,
  exhibitionArticle: exhibitionArticleReducer,
});
