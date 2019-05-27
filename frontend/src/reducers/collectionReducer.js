import {
  FETCH_COLLECTIONS,
  FETCH_COLLECTION_ALBUMS,
  FETCH_COLLECTION,
  UPDATE_COLLECTION,
  CREATE_COLLECTION,
  DELETE_COLLECTION
} from '../actions/types';

import _ from 'lodash';

export const collectionReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      return { ..._.mapKeys(action.payload, 'id') };
    case CREATE_COLLECTION:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_COLLECTION:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_COLLECTION:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_COLLECTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COLLECTION:
      // payload is the id it self
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export const collectionAlbumsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_COLLECTION_ALBUMS:
      return action.payload;
    default:
      return state;
  }
};
