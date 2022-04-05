import _ from "lodash";
import { FETCH_NEWS_ERROR, FETCH_NEWS_ERROR_RESET } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_NEWS_ERROR:
      return { newsError: true };
    case FETCH_NEWS_ERROR_RESET:
      return { newsError: false };
    default:
      return state;
  }
};
