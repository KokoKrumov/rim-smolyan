import _ from "lodash";
import { FETCH_EXHIBITIONS, RESET_FETCH_EXHIBITIONS } from "../actions/types";

let INITIAL_STATE = {
  activeExhibitions: [],
  archiveExhibitions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EXHIBITIONS:
      action.payload.map((exhibition) => {
        if (exhibition.archive) {
          INITIAL_STATE.archiveExhibitions.push(exhibition);
        } else {
          INITIAL_STATE.activeExhibitions.push(exhibition);
        }
      });
      return INITIAL_STATE;
    case RESET_FETCH_EXHIBITIONS:
      return { ...action.data };
    default:
      return state;
  }
};
