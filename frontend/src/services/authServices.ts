import axiosInstance from '../axiosConfig';

export const login = async (username: string, password: string) => {
  console.log('Sending');
  try {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
    });
    const token = response.data.token;
    const user = response.data.user;

    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user.user_id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);
    localStorage.setItem('employee_id', user.employee_id);
    localStorage.setItem('is_supervisor', user.is_supervisor);
    return { role: user.role };
  } catch (error: any) {
    console.error('Error logging in:', error);
    throw error.response?.data?.error;
  }
};
