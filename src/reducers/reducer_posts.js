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
      return _.mapKeys(action.payload.data, 'id');
    case FETCH_ONE_POST:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data
      }
    // this is a test to see if I could work with CREATE_POST payload - answer no...
    case CREATE_POST:
      console.log(action.payload); //undefined!
      return state;
    case DELETE_POST:
      // _.omit will remove a key value pair and NOT mutate state
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
