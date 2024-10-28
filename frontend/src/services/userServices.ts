import axiosInstance from '../axiosConfig';
import { User } from '../types/types';

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
    throw error.response.data.error;
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
    throw error.response.data.error.error;
  }
}

export const updateUser = async (user:User) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      'user/' + user.user_id,
      {
        role: user.role,
        username: user.username,
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

export const deleteUser = async (user_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.delete('user/' + user_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
}