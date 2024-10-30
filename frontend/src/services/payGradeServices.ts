import axiosInstance from '../axiosConfig';

export const getPayGrades = async () => {
  try {
    const response = await axiosInstance.get('/paygrade');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching paygrades:', error);
    return error.response.data.error;
  }
};
