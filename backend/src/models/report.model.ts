import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";
import { Employee } from "./employee.model";
import { validateDateString } from "../utils/validateData";

export interface TotalLeaves extends RowDataPacket {
  dept_id: string;
  department_name: string;
  total_leaves: number;
}

export const reportGroups = [
  "Department",
  "JobTitle",
  "PayGrade",
  "EmploymentStatus",
];

export const getEmployeesByDepartmentIDModel = async (
  dept_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getEmployeeByDepartmentID(?)", [dept_id]);
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Report not found", message: null };
    } else {
      return {
        data: result[0] as Employee[],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    return { data: null, error, message: "Database Query Failed" };
  }
};
export const getEmployeesByJobTitleIDModel = async (
  job_title_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getEmployeeByJobTitleID(?)", [
        job_title_id,
      ]);
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Report not found", message: null };
    } else {
      return {
        data: result[0] as Employee[],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    return { data: null, error, message: "Database Query Failed" };
  }
};

export const getEmployeesByPayGradeIDModel = async (
  pay_grade_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getEmployeeByPayGradeID(?)", [
        pay_grade_id,
      ]);
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Report not found", message: null };
    } else {
      return {
        data: result[0] as Employee[],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    return { data: null, error, message: "Database Query Failed" };
  }
};

export const getEmployeesByEmploymentStatusIDModel = async (
  employment_status: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getEmployeeByEmployementStatusID(?)", [
        employment_status,
      ]);
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Report not found", message: null };
    } else {
      return {
        data: result[0] as Employee[],
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
  end_date: string
): Promise<Output> => {
  if (
    !start_date ||
    !end_date ||
    !validateDateString(start_date) ||
    !validateDateString(end_date)
  ) {
    return {
      data: null,
      error: "Invalid date format. Please use YYYY-MM-DD.",
      message: null,
    };
  }
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>(
        "CALL getTotalLeavesByDepartmentForPeriod(?, ?)",
        [start_date, end_date]
      );
    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Report Not Found", message: null };
    } else {
      return {
        data: result[0] as TotalLeaves[],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    return { data: null, error, message: "Database Query Failed" };
  }
};

export const getReportsByCustomAttributeModel = async (
  attribute_number: number,
  attribute_value: string
) : Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>(
        "CALL getReportByCustomAttribute(?, ?)",
        [attribute_number, attribute_value]
      );
    if (Array.isArray(result) && result.length === 0) {
      throw { data: null, error: "No Employees with this custom attribute value", message: null };
    } else {
      return {
        data: result[0],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    throw { data: null, error, message: "Database Query Failed" };
  }
}