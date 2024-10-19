// src/models/employeesGroupedByDepartmentView.model.ts
import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface EmployeesGroupedByDepartment extends RowDataPacket {
  department_id: string;
  department_name: string;
  employee_count: number;
}

// Function to get all employees grouped by department
export const getAllEmployeesGroupedByDepartmentModel =
  async (): Promise<Output> => {
    try {
      const [result] = await db
        .promise()
        .query("CALL GetAllEmployeesGroupedByDepartment()");
      return {
        data: result as EmployeesGroupedByDepartment[],
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

export const getEmployeesGroupedByDepartmentIDModel = async (
  departmentId: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query("CALL GetEmployeesGroupedByDepartmentID(?)", [departmentId]);
    return {
      data: result as EmployeesGroupedByDepartment[],
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
