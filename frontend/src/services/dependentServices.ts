import axiosInstance from '../axiosConfig';

export const getDependentByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get(
      'dependent/employee/' + employee_id,
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

export const addDependent = async (
  employee_id: string,
  name: string,
  relationship_to_employee: string,
  birth_date: string,
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(
      '/dependent',
      {
        employee_id,
        name,
        relationship_to_employee,
        birth_date,
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
    console.error('Error adding Dependnet ', error);
    throw error.response.data.error;
  }
};

export const updateDependent = async (
  dependent_id: string,
  name: string,
  relationship_to_employee: string,
  birth_date: string,
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      '/dependent/' + dependent_id,
      {
        name,
        relationship_to_employee,
        birth_date,
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
    console.error('Error updatig dependent: ', error);
    throw error.response.data.error;
  }
};

export const deleteDependent = async (dependent_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.delete('/dependent/' + dependent_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error deleting dependent: ', error);
    return error.response.data.error;
  }
};
