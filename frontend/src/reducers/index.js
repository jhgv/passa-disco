import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import discReducer from './discReducer';
import discListTextReducer from './discListTextReducer';

export default combineReducers({
  form: formReducer,
  discs: discReducer,
  listText: discListTextReducer
});
