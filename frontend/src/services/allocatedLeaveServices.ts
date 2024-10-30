import axiosInstance from "../axiosConfig";

export const getLeaveCountByPaygrade = async (paygrade_id: string) => {
    try {
        const response = await axiosInstance.get(`/leave/allocated/${paygrade_id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching leave count: ", error);
        throw error.response ? error.response.data.error : error.message;
    }
}

export const updateLeaveCountByPaygrade = async (paygrade_id: string, annual_leaves:number, casual_leaves:number,maternity_leaves:number,no_pay_leaves:number) => {
    try {
        const response = await axiosInstance.put(`/leave/allocated/${paygrade_id}`, {
            annual_leaves,
            casual_leaves,
            maternity_leaves,
            no_pay_leaves
        });
        return response.data;
    } catch (error: any) {
        console.error("Error updating leave count: ", error);
        throw error.response ? error.response.data.error : error.message;
    }
}