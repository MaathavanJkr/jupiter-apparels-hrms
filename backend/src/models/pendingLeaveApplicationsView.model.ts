// src/models/pendingLeaveApplicationsView.model.ts
import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface PendingLeaveApplication extends RowDataPacket {
    application_id: string;
    employee_name: string;
    leave_type: string;
    start_date: Date;
    end_date: Date;
    reason: string;
    status: string;
    submission_date: Date;
    response_date: Date;
}

export const getAllPendingLeaveApplicationsModel = async (): Promise<Output> => {
    try {
        const [result] = await db.promise().query("CALL GetAllPendingLeaveApplications()");
        return { data: result as PendingLeaveApplication[], error: null, message: null };
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
};

export const getPendingLeaveApplicationByIdModel = async (application_id: string): Promise<Output> => {
    try {
        const [result] = await db.promise().query("CALL GetPendingLeaveApplicationById(?)", [application_id]);
        if (Array.isArray(result) && result.length === 0) {
            return { data: null, error: "Application not found", message: null };
        }
        return { data: result as PendingLeaveApplication[], error: null, message: null };
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
}