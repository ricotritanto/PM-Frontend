import React, { useEffect } from "react"
import axios from "axios"
import Login from "../component/access/login"


export default function authHeader() {
  const auth =  axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'
  const header = axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
  const content =axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    if (header) {
      return { header};
    }else{
      return <Login setToken={header} />
      
    }
  }