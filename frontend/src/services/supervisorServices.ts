import axiosInstance from '../axiosConfig';

// get all the supervisors
export const getSupervisors = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/supervisor/allsuperid', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Data', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching supervisors: ', error);
    return error.response.data.error;
  }
};

// get all the employees under a particular supervisor
export const getEmployeesUnder = async (supervisor_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get(
      //'/supervisor/employees/' + supervisor_id,
        'employee/supervisor/employees/'+ supervisor_id,
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
