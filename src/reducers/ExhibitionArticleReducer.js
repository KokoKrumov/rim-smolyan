import _ from "lodash";
import {
  FETCH_EXHIBITION_ARTICLE,
  FETCH_EXHIBITION_ARTICLE_ERROR,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_EXHIBITION_ARTICLE:
      return action.payload;
    case FETCH_EXHIBITION_ARTICLE_ERROR:
      return action.payload;
    default:
      return state;
  }
};
