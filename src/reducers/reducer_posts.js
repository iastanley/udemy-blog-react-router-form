import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function PostsReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_POSTS:
      // transform array to object with unique id as keys
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
