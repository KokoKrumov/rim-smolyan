import { createSelector } from '@reduxjs/toolkit';

export const selectCategories = createSelector([state => state.categories], Object.values);
export const selectNews = createSelector([state => state.news], Object.values);
export const selectRimBuildingImages = createSelector([state => state.rimBuildingImages], Object.values);
export const selectExhibitionArticle = createSelector([state => state.exhibitionArticle], Object.values);
export const selectRoutes = createSelector([state => state.routes], Object.values);
export const selectServices = createSelector([state => state.services], Object.values);
