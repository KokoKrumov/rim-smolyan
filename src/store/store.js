import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import newsErrorReducer from './newsErrorSlice';
import teamReducer from './teamSlice';
import modalReducer from './modalSlice';
import routesReducer from './routesSlice';
import articleReducer from './articleSlice';
import pricesReducer from './pricesSlice';
import pricesLaszloNagyReducer from './pricesLaszloNagySlice';
import servicesReducer from './servicesSlice';
import categoriesReducer from './categoriesSlice';
import exhibitionsReducer from './exhibitionsSlice';
import exhibitionsErrorReducer from './exhibitionsErrorSlice';
import collectionsReducer from './collectionsSlice';
import rimBuildingImagesReducer from './rimBuildingImagesSlice';
import exhibitionArticleReducer from './exhibitionArticleSlice';
import itemFromCollectionReducer from './itemFromCollectionSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    newsError: newsErrorReducer,
    team: teamReducer,
    modal: modalReducer,
    routes: routesReducer,
    article: articleReducer,
    prices: pricesReducer,
    pricesLaszloNagy: pricesLaszloNagyReducer,
    services: servicesReducer,
    categories: categoriesReducer,
    exhibitions: exhibitionsReducer,
    exhibitionsError: exhibitionsErrorReducer,
    collections: collectionsReducer,
    rimBuildingImages: rimBuildingImagesReducer,
    exhibitionArticle: exhibitionArticleReducer,
    itemFomCollection: itemFromCollectionReducer, // preserving original key spelling
  },
});
