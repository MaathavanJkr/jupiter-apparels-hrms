import axiosInstance from '../axiosConfig';
import { Organization } from '../types/types';

export const getOrganization = async () => {
  try {
    const response = await axiosInstance.get('/organization');
    return response.data.data[0];
  } catch (error) {
    throw error.response.data.error;
  }
};

export const updateOrganization = async (org: Organization) => {
  try {
    const response = await axiosInstance.put(
      '/organization',
      { org },
    );
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
