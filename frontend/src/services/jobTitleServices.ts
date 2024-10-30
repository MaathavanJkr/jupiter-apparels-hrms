import axiosInstance from '../axiosConfig';

export const getJobTitles = async () => {
  try {
    const response = await axiosInstance.get('/jobtitle');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching job titles:', error);
    return error.response.data.error;
  }
};
