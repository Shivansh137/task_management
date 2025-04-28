import axios from 'axios';

const baseURL = 'http://localhost:5000/api'; 

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // send cookies with requests
});

// Request Interceptor: Attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // refresh token if status is 403 
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosInstance.get('auth/refresh');
        const newAccessToken = refreshResponse.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);

          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest); // retry original request
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken'); // Clear token
        return Promise.reject(refreshError);
      }
    }

    // clear token if Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
