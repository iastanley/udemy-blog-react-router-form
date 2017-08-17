import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_ONE_POST = 'FETCH_ONE_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=iasblogapikey';

export function fetchPosts() {
  //making a api request in action creator
  //now fetchPosts is an async action
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  // Not sure exactly how to do error handling but I think some is needed
  const request =
    axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
      .then(() => callback())
      .catch(err => console.log('Network Error: ', err));

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchOnePost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_ONE_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request =
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
      .then(() => callback())
      .catch(err => console.log('Network Error: ', err));

  return {
    type: DELETE_POST,
    payload: id
  }
}
