import { FETCH_PRICES_LASZLO_NAGY } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_PRICES_LASZLO_NAGY:
      return action.payload;
    default:
      return state;
  }
};
