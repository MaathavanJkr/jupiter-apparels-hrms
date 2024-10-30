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

export interface PendingLeaveCount extends RowDataPacket {
  employee_id: string;
  annual_pending_leaves: number;
  casual_pending_leaves: number;
  maternity_pending_leaves: number;
  nopay_pending_leaves: number;
}

export const getAllPendingLeaveApplicationsModel =
  async (): Promise<Output> => {
    try {
      const [result] = await db
        .promise()
        .query<RowDataPacket[][]>("CALL GetAllPendingLeaveApplications()");
      return {
        data: result[0] as PendingLeaveApplication[],
        error: null,
        message: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
        message: "Database Query Failed",
      };
    }
  };

export const getPendingLeaveApplicationByIdModel = async (
  application_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetPendingLeaveApplicationById(?)", [
        application_id,
      ]);
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Application not found", message: null };
    }
    return {
      data: result[0] as PendingLeaveApplication[],
      error: null,
      message: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

export const getPendingLeaveCountByEmployeeIdModel = async (
    emp_id: string
): Promise<Output> => {
  try {
    const [result] = await db
        .promise()
        .query<RowDataPacket[][]>("CALL getPendingLeavesCount(?)", [emp_id]);

    if (!result || result.length === 0) {
      return { data: null, error: "No pending leaves found", message: null };
    }

    return {
      data: result[0] as PendingLeaveCount[],
      error: null,
      message: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};
