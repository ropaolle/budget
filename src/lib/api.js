import axios from 'axios';
import queryString from 'query-string';

export function apiPost(command = '', params) {
  console.log(process.env.REACT_APP_API_PATH, command, params);
  return axios
    .post(process.env.REACT_APP_API_PATH + command, queryString.stringify({ ...params }))
    .catch(err => console.error(err));
}
