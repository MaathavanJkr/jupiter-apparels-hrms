import axiosInstance from "../axiosConfig";

export const addEmployee = async (
    department_id: string,
    branch_id: string,
    supervisor_id: string,
    first_name : string,
    last_name : string,
    birthday: string,
    gender: string,
    marital_status: string,
    address: string,
    email: string,
    NIC: string,
    job_title_id: string,
    pay_grade_id: string,
    employment_status_id: string,
    contact_number: string
) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(
            '/employee', 
            {
                department_id,
                branch_id,
                supervisor_id,
                first_name,
                last_name ,
                birthday,
                gender,
                marital_status,
                address,
                email,
                NIC,
                job_title_id,
                pay_grade_id,
                employment_status_id,
                contact_number
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
        );
        console.log("Response:",response);
        return true;
    } catch(error:any) {
        console.error("Error adding employee: ", error);
        throw error.response.data.error;
    }
};
export const updateEmployee = async (
    employee_id: string,
    department_id: string,
    branch_id: string,
    supervisor_id: string,
    first_name : string,
    last_name : string,
    birthday: string,
    gender: string,
    marital_status: string,
    address: string,
    email: string,
    NIC: string,
    job_title_id: string,
    pay_grade_id: string,
    employee_status_id: string,
    contact_number: string
) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(
            `/employee/` + employee_id, 
            {
                department_id,
                branch_id,
                supervisor_id,
                first_name,
                last_name ,
                birthday,
                gender,
                marital_status,
                address,
                email,
                NIC,
                job_title_id,
                pay_grade_id,
                employee_status_id,
                contact_number
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
        );
        console.log("Response:",response);
        return true;
    } catch(error:any) {
        console.error("Error updating employee: ", error);
        throw error.response.data.error;
    }
};

export const deleteEmployee = async (employee_id: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.delete(`/employee/${employee_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        console.log("Response:",response);
        return true;
    } catch(error) {
        console.error("Error Deleting Employee:", error);
        throw error.response.data.error;
    }
} 

export const getEmployees = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/employee", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        return error.response.data.error;
    }
}

export const getEmployeeByID = async (employee_id: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/employee/"+employee_id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    } catch (error) {
        return error.response.data.error;
    }
}