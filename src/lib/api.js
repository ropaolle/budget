import axios from 'axios';
import queryString from 'query-string';

export function apiPost(command = '', params) {
  return axios
    .post(process.env.REACT_APP_PATH_API + command, queryString.stringify({ ...params }))
    .catch(err => console.error(err));
}
