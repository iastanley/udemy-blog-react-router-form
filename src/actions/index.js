import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_ONE_POST = 'FETCH_ONE_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=iasblogapikey';

export const fetchPosts = () => dispatch => {
  axios.get(`${ROOT_URL}/posts${API_KEY}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_POSTS,
        payload: data
      });
    });
}

export const createPost = (values, callback) => dispatch => {
  axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(({data}) => {
      callback(); // callback to redirect on successful network request
      dispatch({
        type: CREATE_POST,
        payload: data
      });
    });
}

export const fetchOnePost = id => dispatch => {
  axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_ONE_POST,
        payload: data
      });
    });
}

export const deletePost = (id, callback) => dispatch => {
  axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => {
      callback();
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    });
}
