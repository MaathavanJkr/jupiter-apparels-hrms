import axiosInstance from '../axiosConfig';
import { Organization } from '../types/types';

export const getOrganization = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/organization', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data[0];
  } catch (error) {
    throw error.response.data.error;
  }
};

export const updateOrganization = async (org: Organization) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      `/organization/${org.organization_id}`,
      { name: org.name, address: org.address, reg_no: org.reg_no },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw error.response.data.error;
  }
};
