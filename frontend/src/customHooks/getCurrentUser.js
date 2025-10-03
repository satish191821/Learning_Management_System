// getting current user using 
import React, { useInsertionEffect } from 'react';
import { serverUrl } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';


const getCurrentUser = () => {
  useInsertionEffect(()=>{
 const fetchUser = async()=>{
    try {
        const result= await axios.get(serverUrl+"/api/user/getcurrentuser",{withCredentials:true})
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
         dispatch(setUserData(result.null));
    }
 }
  fetchUser()
},[])
}

export default getCurrentUser