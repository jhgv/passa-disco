import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import albumReducer from './albumReducer';
import {
  collectionReducers,
  collectionAlbumsReducer,
  fetchCollectionReducer
} from './collectionReducer';
import albumListTextReducer from './albumListTextReducer';

export default combineReducers({
  form: formReducer,
  collections: collectionReducers,
  collection: fetchCollectionReducer,
  collectionAlbums: collectionAlbumsReducer,
  albums: albumReducer,
  listText: albumListTextReducer
});
