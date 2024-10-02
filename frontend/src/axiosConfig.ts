import axios from "axios";

const axiosInstance = axios.create({
  baseURL:  import.meta.env.VITE_BACKEND_URL, // Update this if your API URL is different
  headers: {
    "Content-Type": "application/json",
  },
});

  
  // Optional: Add request and response interceptors
  axiosInstance.interceptors.request.use(
    (config) => {
      // Do something before the request is sent
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;
  