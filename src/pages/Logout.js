import React from 'react';
import { Redirect } from 'react-router-dom';

function Logout(props) {
  const token = localStorage.getItem('token');
  localStorage.removeItem('token');
  const { logout } = props;
  logout();
  return token ? <Redirect to="/" /> : <Redirect to="/login" />;
}

export default Logout;
