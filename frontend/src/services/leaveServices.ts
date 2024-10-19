import axiosInstance from '../axiosConfig';

export const getLeaveBalanceByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('leave/balance/' + employee_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
export const getUsedLeavesByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('leave/used/' + employee_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getLeaveApplicationsByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('leave/employee/' + employee_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
export const getLatestLeaveApplicationsByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('leave/latest/' + employee_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getLeaveApplicationByID = async (application_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('leave/' + application_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const approveLeave = async (application_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      '/leave/approve/' + application_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
export const rejectLeave = async (application_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      '/leave/reject/' + application_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getPendingLeavesByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/leave/pending/' + employee_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getLeaveCount = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('/leave/count/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
