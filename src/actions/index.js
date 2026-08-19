// Re-exports from RTK slices — maintains backward compat with connect()-based components

export { fetchNews, resetFetchNews } from '../store/newsSlice';
export { fetchTeam } from '../store/teamSlice';
export { fetchRoutes } from '../store/routesSlice';
export { fetchArticle } from '../store/articleSlice';
export { fetchPrices } from '../store/pricesSlice';
export { fetchPricesLaszloNagy } from '../store/pricesLaszloNagySlice';
export { fetchServices } from '../store/servicesSlice';
export { fetchCategories } from '../store/categoriesSlice';
export { fetchExhibitions, resetFetchExhibitions } from '../store/exhibitionsSlice';
export {
  fetchCollectionsMain,
  fetchCollectionsVirtual,
  fetchCollections,
  fetchCollectionDescription,
} from '../store/collectionsSlice';
export { fetchRimBuildingImages } from '../store/rimBuildingImagesSlice';
export { fetchExhibitionArticle } from '../store/exhibitionArticleSlice';
export { fetchItemFromCollection } from '../store/itemFromCollectionSlice';

import { modalActions } from '../store/modalSlice';

// Thunk wrappers for showModal/closeModal — preserve the (data, url, user) API used by components
export const showModal = (data, url, user) => (dispatch) => {
  switch (data) {
    case 'modal-redirect':
      return dispatch(modalActions.showRedirect({ data, url }));
    case 'modal-shishkov':
      return dispatch(modalActions.showNedelov({ data }));
    case 'modal-team':
      return dispatch(modalActions.showTeam({ data, user }));
    default:
      break;
  }
};

export const closeModal = (data) => (dispatch) => {
  switch (data) {
    case 'modal-redirect':
      return dispatch(modalActions.closeRedirect({ data }));
    case 'modal-shishkov':
      return dispatch(modalActions.closeNedelov({ data }));
    case 'modal-team':
      return dispatch(modalActions.closeTeam({ data }));
    default:
      break;
  }
};
