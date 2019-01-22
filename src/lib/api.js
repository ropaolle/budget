import axios from 'axios';
import queryString from 'query-string';

export const apiPost = (command = '', params) =>
  axios
    .post(process.env.REACT_APP_API_PATH + command, queryString.stringify({ ...params }))
    .catch(err => console.error(err));

export const dummy = () => {};
