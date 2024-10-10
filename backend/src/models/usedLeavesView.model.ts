// src/models/usedLeavesView.model.ts
import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface UsedLeaves extends RowDataPacket {
    employee_id: string;
    employee_name: string;
    used_annual_leaves: number;
    used_casual_leaves: number;
    used_maternity_leaves: number;
    used_nopay_leaves: number;
    total_used_leaves: number;
}

export const getAllUsedLeavesModel = async (): Promise<Output> => {
    try {
        const [result] = await db.promise().query("CALL GetAllUsedLeaves()");
        return { data: result as UsedLeaves[], error: null, message: null };
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
};

export const getUsedLeavesByEmployeeIDModel = async (employee_id: string): Promise<Output> => {
    try {
        const [result] = await db.promise().query("CALL GetUsedLeavesByEmployeeID(?)", [employee_id]);
        return { data: (result as UsedLeaves[])[0], error: null, message: null };
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
};
