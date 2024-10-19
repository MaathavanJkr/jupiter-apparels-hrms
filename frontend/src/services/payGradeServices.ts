import axiosInstance from '../axiosConfig';

export const getPayGrades = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/paygrade', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching paygrades:', error);
    return error.response.data.error;
  }
};
