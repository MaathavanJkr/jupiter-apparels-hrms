import axiosInstance from '../axiosConfig';

export const getEmploymentStatuses = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/employmentstatus', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return error.response.data.error;
  }
};
