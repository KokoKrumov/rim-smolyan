import {
    FETCH_NEWS,
    FETCH_ARTICLE,
    FETCH_REDIRECT_MODAL,
    FETCH_NEDELOV_MODAL,
    CLOSE_NEDELOV_MODAL,
    CLOSE_REDIRECT_MODAL,
    FETCH_RIM_BUILDING_IMAGES,
    FETCH_TEAM_MODAL, CLOSE_TEAM_MODAL,
    FETCH_TEAM,
    FETCH_EXHIBITIONS,
    FETCH_ROUTES, FETCH_SERVICES, FETCH_COLLECTIONS_MAIN, FETCH_COLLECTIONS_VIRTUAL, FETCH_COLLECTIONS_ARCHEOLOGY
} from './types';

import streams from "../api/streams";
//Create Actions

export const fetchNews = () => async dispatch => {
    const response = await streams.get('/news.json');
    dispatch({type: FETCH_NEWS, payload: response.data})
}

export const fetchRoutes = () => async dispatch => {
    const response = await streams.get('/routes.json');
    dispatch({type: FETCH_ROUTES, payload: response.data})
}

export const fetchCollectionsMain = () => async dispatch => {
    const response = await streams.get('/collections-main.json');
    dispatch({type: FETCH_COLLECTIONS_MAIN, payload: response.data})
}

export const fetchCollections = (fetchType, collectionsType) => async dispatch => {
console.log(fetchType, collectionsType);
    const response = await streams.get(`/collections-${collectionsType}.json`);
    dispatch({type: `FETCH_COLLECTIONS_${fetchType}`, payload: response.data})

}

export const fetchCollectionsVirtual = () => async dispatch => {
    const response = await streams.get('/collections-virtual.json');
    dispatch({type: FETCH_COLLECTIONS_VIRTUAL, payload: response.data})
}

export const fetchExhibitions = () => async dispatch => {
    const response = await streams.get('/exhibitions.json');
    dispatch({type: FETCH_EXHIBITIONS, payload: response.data})
}

export const fetchServices = () => async dispatch => {
    const response = await streams.get('/services.json');
    dispatch({type: FETCH_SERVICES, payload: response.data})
}

export const fetchRimBuildingImages = () => async dispatch => {
    const response = await streams.get('/rim-building-images.json');
    dispatch({type: FETCH_RIM_BUILDING_IMAGES, payload: response.data})
}

export const fetchTeam = () => async dispatch => {
    const response = await streams.get('/team.json');
    dispatch({type: FETCH_TEAM, payload: response.data})
}

export const fetchArticle = (id) => async dispatch => {
    const response = await streams.get(`/streamy/${id}`);
    dispatch({type: FETCH_ARTICLE, payload: response.data})
}

export const showModal = (data, url, user) => {
    switch (data) {
        case 'modal-redirect':
            return {
                type: FETCH_REDIRECT_MODAL,
                data: data,
                url: url
            }
        case 'modal-shishkov':
            return {
                type: FETCH_NEDELOV_MODAL,
                data: data
            }
        case 'modal-team':
            return {
                type: FETCH_TEAM_MODAL,
                data: data,
                user: user
            }
        default:
            return data;
    }
}

export const closeModal = (data) => {
    switch (data) {
        case 'modal-redirect':
            return {
                type: CLOSE_REDIRECT_MODAL,
                data: data
            }
        case 'modal-shishkov':
            return {
                type: CLOSE_NEDELOV_MODAL,
                data: data
            }
        case 'modal-team':
            return {
                type: CLOSE_TEAM_MODAL,
                data: data
            }
        default:
            return data;
    }
}
