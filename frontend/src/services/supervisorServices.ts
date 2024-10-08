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