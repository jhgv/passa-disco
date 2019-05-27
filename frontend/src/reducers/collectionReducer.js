import {
  FETCH_COLLECTIONS,
  FETCH_COLLECTION_ALBUMS,
  FETCH_COLLECTION,
  UPDATE_COLLECTION
} from '../actions/types';

export const collectionReducers = (state = [], action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      return action.payload;
    case UPDATE_COLLECTION:
      return action.payload;
    default:
      return state;
  }
};

export const fetchCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COLLECTION:
      return action.payload;
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
