import axiosInstance from "../axiosConfig";

export const getUserInfoById = async (user_id : string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("user/info/"+ user_id, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    } catch (error) {
        return error.response.data.error;
    }
}