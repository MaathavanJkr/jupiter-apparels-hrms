import axiosInstance from '../axiosConfig';

export const getJobTitles = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/jobtitle', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching job titles:', error);
    return error.response.data.error;
  }
};
