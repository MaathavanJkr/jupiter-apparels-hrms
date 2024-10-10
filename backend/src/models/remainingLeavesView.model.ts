import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface RemainingLeaves extends RowDataPacket {
    employee_id: string;
    employee_name: string;
    remaining_annual_leaves: number;
    remaining_casual_leaves: number;
    remaining_maternity_leaves: number;
    remaining_nopay_leaves: number;
    total_remaining_leaves: number;
}

export const getAllRemainingLeavesModel = async (): Promise<Output> => {
    try {
        const [result] = await db.promise().query("CALL GetAllRemainingLeaves()");
        return { data: result as RemainingLeaves[], error: null, message: null };
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
};


export const getRemainingLeavesByEmployeeIDModel = async (employee_id: string): Promise<Output> => {
    try {
        const [result] = await db.promise().query("CALL GetRemainingLeavesByID(?)", [employee_id]);

        if (Array.isArray(result) && result.length === 0) {
            return { data: null, error: "Remaining leaves not found for this employee", message: null };
        } else {
            return {
                data: result as RemainingLeaves[],
                error: null,
                message: null,
            };
        }
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
};



