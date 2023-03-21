import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const userToken = localStorage.getItem('token')
    return userToken? JSON.parse(userToken).token:null
  }

  const [token, setToken] = useState(getToken())
  
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }
  // setTimeout(()=>{
  //   localStorage.removeItem('token')
  //   setToken(null)
  // },5*5*1000)

  return {
    setToken: saveToken,
    token
  }
}