import axios from 'axios';

const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` };

export const apiPost = (command = '', params) =>
  axios.post(process.env.REACT_APP_API_PATH + command, params, { headers }).catch(err => console.error(err));

export const apiDelete = (command = '') =>
  axios.delete(process.env.REACT_APP_API_PATH + command, { headers }).catch(err => console.error(err));

// Axios automatically converts params to a query string.
export const apiGet = (command = '', params) =>
  axios.get(process.env.REACT_APP_API_PATH + command, { params, headers }).catch(err => console.error(err));
