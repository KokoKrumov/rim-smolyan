import {
    FETCH_NEWS,
    FETCH_ARTICLE,
    FETCH_REDIRECT_MODAL,
    FETCH_LASLO_MODAL
} from './types';

import streams from "../api/streams";
//Create Actions

export const fetchNews = () => async dispatch => {
    const response = await streams.get('/news.json');
    dispatch({type: FETCH_NEWS, payload: response.data})
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
        case 'modal-laslo':
            return {
                type: FETCH_LASLO_MODAL,
                data: data
            }
        default:
            return data;
    }

}
