import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import albumReducer from './albumReducer';
import {
  collectionReducers,
  collectionAlbumsReducer
} from './collectionReducer';
import albumListTextReducer from './albumListTextReducer';

export default combineReducers({
  form: formReducer,
  collections: collectionReducers,
  collectionAlbums: collectionAlbumsReducer,
  albums: albumReducer,
  listText: albumListTextReducer
});
