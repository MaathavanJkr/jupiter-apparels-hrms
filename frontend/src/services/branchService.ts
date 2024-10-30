import axiosInstance from '../axiosConfig';

export const getBranches = async () => {
  try {
    const response = await axiosInstance.get('/branch');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return error.response.data.error;
  }
};
