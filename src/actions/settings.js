import { formatUserObj } from '../utils';

export const LOAD_USER = 'LOAD_USER';

export const loadUser = user => ({
  type: LOAD_USER,
  user: formatUserObj(user),
});

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

const settingsKeyedById = docs => docs.reduce((settings, doc) => ({
  ...settings,
  [doc.id]: {
    ...doc.data(),
  },
}), {});

export const updateSettings = json => ({
  type: UPDATE_SETTINGS,
  settings: settingsKeyedById(json),
});
