import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import albumReducer from './albumReducer';
import albumListTextReducer from './albumListTextReducer';

export default combineReducers({
  form: formReducer,
  albums: albumReducer,
  listText: albumListTextReducer
});
