import {
  FETCH_COLLECTIONS_BYTYPE,
  FETCH_COLLECTIONS_BYTYPE_ERROR,
  FETCH_COLLECTIONS_MAIN,
  FETCH_COLLECTIONS_VIRTUAL,
  FETCH_COLLECTION_DESCRIPTION,
  FETCH_COLLECTION_DESCRIPTION_ERROR,
} from "../actions/types";

let INITIAL_STATE = {
  main: [],
  virtual: [],
  byType: [],
  description: [],
  error: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS_MAIN:
      return { ...state, main: action.payload };
    case FETCH_COLLECTIONS_VIRTUAL:
      return { ...state, virtual: action.payload };
    case FETCH_COLLECTIONS_BYTYPE:
      return { ...state, byType: action.payload };
    case FETCH_COLLECTIONS_BYTYPE_ERROR:
      return { ...state, error: action.payload };
    case FETCH_COLLECTION_DESCRIPTION:
      return { ...state, description: action.payload };
    case FETCH_COLLECTION_DESCRIPTION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
