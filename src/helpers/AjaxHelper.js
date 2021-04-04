import { AUTH_TOKEN_KEY } from '../constant';

const apiToken = localStorage.getItem(AUTH_TOKEN_KEY);

export const setConfig = () => {
  return {
    headers: { 'Authorization': `Bearer ${apiToken}` },
  };
};