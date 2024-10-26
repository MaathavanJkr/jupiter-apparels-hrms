import axiosInstance from '../axiosConfig';

export const getUserInfoById = async (user_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('employee/info/' + user_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getUserByID = async (user_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('user/' + user_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const changePassword = async (
  user_id: string,
  old_password: string,
  new_password: string,
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      'user/change_password/' + user_id,
      {
        old_password,
        new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error;
  }
};

export const createUserAccount = async (employee_id: string,role:string, username: string, password: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(
      '/user',
      {
        employee_id,
        username,
        password,
        role
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
}