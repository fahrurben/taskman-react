const apiToken = process.env.REACT_APP_API_TOKEN;

export const setConfig = () => {
  return {
    headers: { 'Authorization': `Bearer ${apiToken}` },
  };
};