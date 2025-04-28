import React from 'react'
import axiosInstance from '../api/axios';

const useRefreshToken = async () => {
    try {
      const res = await axiosInstance.get('/auth/refresh');
      const accessToken = res.data?.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
    } catch (err) {
      console.log('Refresh failed:', err);
      localStorage.removeItem('accessToken');
      navigate('/login')
    }
  };

export default useRefreshToken