import axiosInstance from '../axiosConfig';

export const applyLeave = async (
  leaveType: string,
  start_date: string,
  end_date: string,
  reason: string,
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(
      '/leave/apply',
      {
        leave_type: leaveType, // Changed to leave_type to match API
        start_date,
        end_date,
        reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('Response:', response);
    return response.data; // Return true if the request is successful
  } catch (error: any) {
    console.error('Error creating leave application: ', error);
    throw error.response.data.error; // Throw error if request fails
  }
};


export const createLeaveApplication = async (
  employee_id: string,
  leaveType: string,
  start_date: string,
  end_date: string,
  reason: string,
) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(
      '/leave/application',
      {
        employee_id,
        leave_type: leaveType, // Changed to leave_type to match API
        start_date,
        end_date,
        reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('Response:', response);
    return true; // Return true if the request is successful
  } catch (error: any) {
    console.error('Error creating leave application: ', error);
    throw error.response.data.error; // Throw error if request fails
  }
};

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

export const getMyLeaveApplications = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get('leave/my', {
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
    //console.log('Fetched Leave Applications:', response.data.data);
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
    const response = await axiosInstance.get('leave/view/' + application_id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Fetched Leave Application:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('Error in services');
    throw error.response.data.error;
  }
};

export const approveLeave = async (application_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      '/leave/approve/' + application_id,
      {
        status: 'Approved',
        response_date: new Date().toISOString().split('T')[0],
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
// export const rejectLeave = async (application_id: string) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axiosInstance.put(
//             '/leave/reject/' + application_id,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             },
//         );
//         return response.data.data;
//     } catch (error) {
//         throw error.response.data.error;
//     }
// };

export const rejectLeave = async (application_id: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(
      '/leave/reject/' + application_id,
      {
        status: 'Rejected',
        response_date: new Date().toISOString().split('T')[0],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(new Date().toISOString().split('T')[0]);
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
    const response = await axiosInstance.get(
      `/leave/pending/supervisor/${supervisor_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
};
