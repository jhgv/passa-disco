import {
  CREATE_DISC,
  FETCH_DISCS,
  FETCH_DISC,
  UPDATE_DISC,
  DELETE_DISC,
  SEARCH_DISC
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_DISC || FETCH_DISC || UPDATE_DISC:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_DISC:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_DISC:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_DISCS:
      return { ..._.mapKeys(action.payload, 'id') };
    case SEARCH_DISC:
      return action.payload;
    case DELETE_DISC:
      // payload is the id it self
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
