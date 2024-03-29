import _ from "lodash";
import { FETCH_ARTICLE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      return action.payload;
    default:
      return state;
  }
};
