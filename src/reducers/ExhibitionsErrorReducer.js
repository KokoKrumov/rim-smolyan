import _ from "lodash";
import {
  FETCH_EXHIBITIONS_ERROR,
  FETCH_EXHIBITIONS_ERROR_RESET,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_EXHIBITIONS_ERROR:
      return { exhibitionsError: true };
    case FETCH_EXHIBITIONS_ERROR_RESET:
      return { exhibitionsError: false };
    default:
      return state;
  }
};
