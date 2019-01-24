import axios from 'axios';

export const apiPost = (command = '', params) =>
  axios.post(process.env.REACT_APP_API_PATH + command, params).catch(err => console.error(err));

export const apiDelete = (command = '', params) =>
  axios.delete(process.env.REACT_APP_API_PATH + command, { data: params }).catch(err => console.error(err));

export const apiGet = (command = '') =>
  axios.get(process.env.REACT_APP_API_PATH + command).catch(err => console.error(err));
