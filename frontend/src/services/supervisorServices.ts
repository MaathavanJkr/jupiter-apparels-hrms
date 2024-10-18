import axiosInstance from "../axiosConfig";

export const getSupervisors = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/employee/supervisor' , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Data",response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching supervisors: ", error);
        return error.response.data.error;
    }
}

export const getEmployeesUnder = async (supervisor_id:string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/supervisor/employees/'+supervisor_id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch(error) {
        return error.response.data.error;
    }
}