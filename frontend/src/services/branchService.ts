import axiosInstance from '../axiosConfig';

export const getBranches = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/branch', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return error.response.data.error;
  }
};
