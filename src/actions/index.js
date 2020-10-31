import {
    FETCH_NEWS,
    FETCH_ARTICLE,
    FETCH_REDIRECT_MODAL,
    FETCH_NEDELOV_MODAL,
    CLOSE_NEDELOV_MODAL,
    CLOSE_REDIRECT_MODAL,
    FETCH_RIM_BUILDING_IMAGES
} from './types';

import streams from "../api/streams";
//Create Actions

export const fetchNews = () => async dispatch => {
    const response = await streams.get('/news.json');
    dispatch({type: FETCH_NEWS, payload: response.data})
}

export const fetchRimBuildingImages = () => async dispatch => {
    const response = await streams.get('/rim-building-images.json');
    dispatch({type: FETCH_RIM_BUILDING_IMAGES, payload: response.data})
}

export const fetchArticle = (id) => async dispatch => {
    const response = await streams.get(`/streamy/${id}`);
    dispatch({type: FETCH_ARTICLE, payload: response.data})
}

export const showModal = (data) => {
    switch (data) {
        case 'modal-redirect':
            return {
                type: FETCH_REDIRECT_MODAL,
                data: data
            }
        case 'modal-nedelov':
            return {
                type: FETCH_NEDELOV_MODAL,
                data: data
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
        case 'modal-nedelov':
            return {
                type: CLOSE_NEDELOV_MODAL,
                data: data
            }
        default:
            return data;
    }
}
