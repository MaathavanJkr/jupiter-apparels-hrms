import axiosInstance from '../axiosConfig';

export const getEmploymentStatuses = async () => {
  try {
    const response = await axiosInstance.get('/employmentstatus');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return error.response.data.error;
  }
};
