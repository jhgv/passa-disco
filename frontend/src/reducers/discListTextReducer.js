import { CHANGE_LIST_TEXT } from '../actions/types';

export default (state = 'Collection', action) => {
  switch (action.type) {
    case CHANGE_LIST_TEXT:
      return action.payload;
    default:
      return state;
  }
};
