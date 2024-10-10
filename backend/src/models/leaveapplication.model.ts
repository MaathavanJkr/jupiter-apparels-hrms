import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

enum LeaveType {
  annual = 'Annual',
  casual = 'Casual',
  maternity = 'Maternity',
  nopay = 'Nopay'
}

enum Status {
  pending = 'Pending',
  approved = 'Approved',
  rejected = 'Rejected'
}

export interface LeaveApplication extends RowDataPacket {
  application_id?: string;
  employee_id: string;
  leave_type: LeaveType;
  start_date: Date;
  end_date: Date;
  reason: string;
  submission_date: Date;
  status: Status;
  response_date: Date | null;
}

export const createLeaveApplicationModel = async (
    leaveApplication: LeaveApplication
): Promise<Output> => {
  const {
    employee_id,
    leave_type,
    start_date,
    end_date,
    reason
  } = leaveApplication;

  leaveApplication.application_id = uuidv4();
  leaveApplication.status = Status.pending; // Set status to 'Pending' by default
  leaveApplication.submission_date = new Date(); // Set submission date to the current date

  if (!employee_id || !leave_type || !start_date || !end_date || !reason) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query(
            "CALL CreateLeaveApplication(?, ?, ?, ?, ?)",
            [employee_id, leave_type, start_date, end_date, reason]
        );
    return {
      data: leaveApplication,
      message: "Leave application created successfully",
      error: null,
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};

export const getLeaveApplicationByIDModel = async (
    id: string
): Promise<Output> => {
  try {
    const [result] = await db
        .promise()
        .query("CALL GetLeaveApplicationByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Leave application not found", message: null };
    } else {
      return {
        data: (result as LeaveApplication[])[0],
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

export const getAllLeaveApplicationsModel = async (): Promise<Output> => {
  try {
    const [result] = await db.promise().query("CALL GetAllLeaveApplications()");
    return { data: result as LeaveApplication[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

export const updateLeaveApplicationModel = async (
    leaveApplication: LeaveApplication
): Promise<Output> => {
  const { application_id, leave_type, start_date, end_date, reason, status, response_date } = leaveApplication;

  if (!application_id || !leave_type || !start_date || !end_date || !reason || !status) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query(
            "CALL UpdateLeaveApplication(?, ?, ?, ?, ?, ?, ?)",
            [application_id, leave_type, start_date, end_date, reason, status, response_date]
        );
    return {
      message: "Leave application updated successfully",
      error: null,
      data: leaveApplication,
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};

export const deleteLeaveApplicationModel = async (
    application_id: string
): Promise<Output> => {
  if (!application_id) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query("CALL DeleteLeaveApplication(?)", [application_id]);
    return {
      message: "Leave application deleted successfully",
      error: null,
      data: { id: application_id },
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};
