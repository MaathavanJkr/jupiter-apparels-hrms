import axiosInstance from '../axiosConfig';

export const getContactByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get(
      'emergencycontact/employee/' + employee_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export const addContact = async (
  employee_id: string,
  name: string,
  relationship: string,
  contact_number: string,
  address: string,
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(
      '/emergencycontact',
      {
        employee_id,
        name,
        relationship,
        contact_number,
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Response: ', response);
    return true;
  } catch (error) {
    console.error('Error adding contact ', error);
    throw error.response.data.error;
  }
};

export const updateContact = async (
  emergency_id: string,
  name: string,
  relationship: string,
  contact_number: string,
  address: string,
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      '/emergencycontact/' + emergency_id,
      {
        name,
        relationship,
        contact_number,
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('Response: ', response);
    return true;
  } catch (error: any) {
    console.error('Error updating contact: ', error);
    throw error.response.data.error;
  }
};

export const deleteContact = async (emergency_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.delete(
      '/emergencycontact/' + emergency_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error('Error deleting contact: ', error);
    return error.response.data.error;
  }
};
