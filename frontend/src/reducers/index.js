import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import discReducer from './discReducer';

export default combineReducers({
  form: formReducer,
  discs: discReducer
});
