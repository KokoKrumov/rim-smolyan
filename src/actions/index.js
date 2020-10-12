import {
    FETCH_NEWS,
    FETCH_ARTICLE
} from './types';

import streams from "../api/streams";
//Create Actions

export const fetchNews = () => async dispatch => {
    const response = await streams.get('news.json');
    dispatch({type: FETCH_NEWS, payload: response.data})
}

export const fetchArticle = (id) => async dispatch => {
    const response = await streams.get(`/streamy/${id}`);
    dispatch({type: FETCH_ARTICLE, payload: response.data})
}
