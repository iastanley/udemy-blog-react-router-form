import _ from 'lodash';
import {
  FETCH_POSTS,
  FETCH_ONE_POST,
  CREATE_POST,
  DELETE_POST
 } from '../actions';

export default function PostsReducer(state = {}, action) {
  switch(action.type) {
    case FETCH_POSTS:
      // transform array to object with unique id as keys
      return _.mapKeys(action.payload, 'id');
    case FETCH_ONE_POST:
    case CREATE_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case DELETE_POST:
      // _.omit will remove a key value pair and NOT mutate state
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
