import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const userToken = localStorage.getItem('token');
    // console.log(tokenString)
    // const userToken = JSON.parse(tokenString);
    // console.log(userToken)
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());
  
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}