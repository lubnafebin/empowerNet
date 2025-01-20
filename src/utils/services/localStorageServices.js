import { localStorageLabels } from '../constants';

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const clearLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const toggleThemeService = ({
  theme = 'light',
  type = 'set' | 'get',
}) => {
  const key = localStorageLabels.THEME;
  return type === 'set' ? setLocalStorage(key, theme) : getLocalStorage(key);
};

export const getAuthDetailsServices = () => {
  const key = localStorageLabels.AUTH_DETAILS;
  const authDetails = getLocalStorage(key);
  return typeof authDetails === 'string' ? JSON.parse(authDetails) : null;
};

export const setAuthDetailsServices = (authDetails) => {
  const key = localStorageLabels.AUTH_DETAILS;
  return setLocalStorage(key, JSON.stringify(authDetails));
};

export const logoutServices = () => {
  const key = localStorageLabels.AUTH_DETAILS;
  return clearLocalStorage(key);
};
