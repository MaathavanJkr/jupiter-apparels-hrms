import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";
import { Employee } from "./employee.model";

export interface TotalLeaves extends RowDataPacket {
  dept_id: string;
  department_name: string;
  total_leaves: number;
}

export const getEmployeesByDepartmentIDModel = async (
  dept_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getAllEmployeesByFilter(?, null, null, null, null)", [dept_id]);
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "User not found", message: null };
    } else {
      return {
        data: (result[0] as Employee[]),
        error: null,
        message: null,
      };
    }
  } catch (error) {
    return { data: null, error, message: "Database Query Failed" };
  }
};

export const getTotalLeavesByDepartmentForPeriodModel = async (
  start_date: string,
  end_date: string,
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getTotalLeavesByDepartmentForPeriod(?, ?)", [start_date, end_date]);
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "User not found", message: null };
    } else {
      return {
        data: (result[0] as TotalLeaves[]),
        error: null,
        message: null,
      };
    }
  } catch (error) {
    return { data: null, error, message: "Database Query Failed" };
  }
};