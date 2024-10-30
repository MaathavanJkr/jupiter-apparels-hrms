import axiosInstance from '../axiosConfig';

export const getCustomAttributes = async () => {
  try {
    const response = await axiosInstance.get('/attribute');
    return response.data.data;
  } catch (error: any) {
    console.error('Error getting attributes:', error);
    throw error.response.data.error;
  }
};
