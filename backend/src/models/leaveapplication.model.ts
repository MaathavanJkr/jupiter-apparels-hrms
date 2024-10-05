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

export interface LeaveApplication extends RowDataPacket{
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
  
    // Set status to 'Pending' by default
    leaveApplication.status = Status.pending;
  
    // Set submission date to the current date
    leaveApplication.submission_date = new Date();
  
    if (!employee_id || !leave_type || !start_date || !end_date || !reason) {
      return { error: "Missing required fields", data: null, message: null };
    }
  
    try {
      await db
        .promise()
        .query(
          "INSERT INTO leave_applications (application_id, employee_id, leave_type, start_date, end_date, reason, submission_date, status, response_date) VALUES (UUID(), ?, ?, ?, ?, ?, NOW(), ?, NULL)",
          [employee_id, leave_type, start_date, end_date, reason, Status.pending]
        );
      return {
        data: leaveApplication,
        message: "Leave application created successfully",
        error: null,
      };
    } catch (error) {
      return { error: error, message: "Database Query Failed", data: null };
    }
  };
 

export const getLeaveApplicationByIDModel = async (
    id: string
  ): Promise<Output> => {
    try {
      const [result] = await db
        .promise()
        .query("SELECT * FROM leave_applications WHERE application_id = ?", [id]);
  
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
        error: error,
        message: "Database Query Failed",
      };
    }
  }; 


export const getAllLeaveApplicationsModel = async (): Promise<Output> => {
    try {
      const [result] = await db.promise().query("SELECT * FROM leave_applications");
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
        "UPDATE leave_applications SET leave_type = ?, start_date = ?, end_date = ?, reason = ?, status = ?, response_date = ? WHERE application_id = ?",
        [leave_type, start_date, end_date, reason, status, response_date, application_id]
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
      .query("DELETE FROM leave_applications WHERE application_id = ?", [
        application_id,
      ]);
    return {
      message: "Leave application deleted successfully",
      error: null,
      data: { id: application_id },
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};
 
