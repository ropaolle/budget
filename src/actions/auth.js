import { formatUserObj } from '../utils';

export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = user => ({
  type: UPDATE_USER,
  user: formatUserObj(user),
});
