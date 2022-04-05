import _ from "lodash";
import { FETCH_NEWS, RESET_FETCH_NEWS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return { ...Object.values(action.payload) };
    case RESET_FETCH_NEWS:
      return { ...action.data };
    default:
      return state;
  }
};
