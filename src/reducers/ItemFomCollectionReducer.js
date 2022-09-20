import _ from "lodash";
import {
  FETCH_ITEM_FROM_COLLECTION,
  FETCH_ITEM_FROM_COLLECTION_ERROR,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ITEM_FROM_COLLECTION:
      return action.payload;
    case FETCH_ITEM_FROM_COLLECTION_ERROR:
      return action.payload;
    default:
      return state;
  }
};
