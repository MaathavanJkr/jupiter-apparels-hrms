import axiosInstance from '../axiosConfig';
import { CustomAttribute } from '../types/types';

export const getCustomAttributes = async () => {
  try {
    const response = await axiosInstance.get('/attribute');
    return response.data.data;
  } catch (error: any) {
    console.error('Error getting attributes:', error);
    throw error.response.data.error;
  }
};

export const updateCustomAttribute = async (attribute: CustomAttribute) => {
  try {
    const response = await axiosInstance.put(
      `/attribute/${attribute.custom_attribute_key_id}`,
      {
        name: attribute.name,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error updating custom attribute:', error);
    throw error.response?.data || 'An error occurred';
  }
};
