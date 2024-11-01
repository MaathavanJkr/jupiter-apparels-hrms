// src/models/totalLeavesByDepartmentView.model.ts
import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface TotalLeavesByDepartment extends RowDataPacket {
  department_id: string;
  department_name: string;
  total_leaves_taken: number;
}

// Function to get total leaves by department
export const getTotalLeavesByDepartmentModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetTotalLeavesByDepartment()");
    return {
      data: result[0] as TotalLeavesByDepartment[],
      error: null,
      message: null,
    };
  } catch (error) {
    throw {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

// Function to get total leaves by specific department ID
export const getTotalLeavesByDepartmentIDModel = async (
  departmentId: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetTotalLeavesByDepartmentID(?)", [
        departmentId,
      ]);
    return {
      data: result[0] as TotalLeavesByDepartment[],
      error: null,
      message: null,
    };
  } catch (error) {
    throw {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};
