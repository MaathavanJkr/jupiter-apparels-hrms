import axiosInstance from "../axiosConfig";

export const getLeaveBalanceByID = async (employee_id:string) => {
    try{
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get("leave/balance/"+ employee_id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
}

