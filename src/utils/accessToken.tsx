import secureLocalStorage from 'react-secure-storage';

const getAccessToken = () => {
  return secureLocalStorage.getItem('accessToken');
};

const setAccessToken = (token: string) => {
  secureLocalStorage.setItem('accessToken', token);
  return secureLocalStorage.getItem('accessToken');
};

export { getAccessToken, setAccessToken };
