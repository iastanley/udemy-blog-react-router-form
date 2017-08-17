import _ from 'lodash';
import { FETCH_POSTS, FETCH_ONE_POST } from '../actions';

export default function PostsReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_POSTS:
      // transform array to object with unique id as keys
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_ONE_POST:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data
      }
    default:
      return state;
  }
}
