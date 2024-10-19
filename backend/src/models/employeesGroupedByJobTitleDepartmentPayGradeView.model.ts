// src/models/employeesGroupedByJobTitleDepartmentPayGradeView.model.ts
import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface EmployeesGroupedByJobTitle extends RowDataPacket {
  job_title: string;
  department_name: string;
  pay_grade: string;
  employee_count: number;
}

// Function to get employees grouped by job title, department, and pay grade
export const getEmployeesGroupedByJobTitleModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetEmployeesGroupedByJobTitle()");
    return {
      data: result[0] as EmployeesGroupedByJobTitle[],
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

// Function to get employees grouped by specific job title
export const getEmployeesGroupedByJobTitleIDModel = async (
  jobTitle: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetEmployeesGroupedByJobTitleID(?)", [
        jobTitle,
      ]);
    return {
      data: result[0] as EmployeesGroupedByJobTitle[],
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
