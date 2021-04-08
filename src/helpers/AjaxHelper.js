import { AUTH_TOKEN_KEY } from '../constant';

export const setConfig = () => {
  const apiToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    headers: { 'Authorization': `Bearer ${apiToken}` },
  };
};