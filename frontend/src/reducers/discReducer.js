import {
  CREATE_DISC,
  FETCH_DISCS,
  FETCH_DISC,
  UPDATE_DISC,
  DELETE_DISC
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
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case DELETE_DISC:
      // payload is the id it self
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
