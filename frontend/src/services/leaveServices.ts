import axiosInstance from '../axiosConfig';

export const getLeaveBalanceByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('leave/balance/' + employee_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
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
    return response.data.data;
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
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// this function should return latest leave applications  and all pending leave applications using employee_id
export const getLatestLeaveApplicationsByID = async (employee_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('leave/latest/' + employee_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
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
    return response.data.data;
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
    return response.data.data;
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
    return response.data.data;
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
    return response.data.data;
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
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

// to display the pending leave applications in the suppervisor dashboard
export const getPendingLeavesBySupervisorID = async (supervisor_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get(`/leave/pending/supervisor/${supervisor_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
};
