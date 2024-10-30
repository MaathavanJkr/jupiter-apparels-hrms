import axiosInstance from '../axiosConfig';

export const getDepartments = async () => {
  try {
    const response = await axiosInstance.get('/department');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return error.response.data.error;
  }
};

// This should return the Employee count by department ID
export const getCountByDepartment = async (department_id: string) => {
  try {
    const response = await axiosInstance.get('/department/count/'+ department_id,
    );
    return response.data.data;
  } catch (error) {
    return error.response.data.error;
 }
};