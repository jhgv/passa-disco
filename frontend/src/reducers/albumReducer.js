import {
  CREATE_ALBUM,
  FETCH_ALBUMS,
  FETCH_ALBUM,
  UPDATE_ALBUM,
  DELETE_ALBUM,
  SEARCH_ALBUM
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_ALBUM || FETCH_ALBUM || UPDATE_ALBUM:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_ALBUM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_ALBUM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_ALBUMS:
      return { ..._.mapKeys(action.payload, 'id') };
    case SEARCH_ALBUM:
      return action.payload;
    case DELETE_ALBUM:
      // payload is the id it self
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
