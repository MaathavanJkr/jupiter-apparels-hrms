import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface EmployeeBasicInfo extends RowDataPacket {
  employee_id: string;
  full_name: string;
  birth_date: string;
  gender: string;
  marital_status: string;
  address: string;
  email: string;
  contact_number: string;
  NIC: string;
  nationality: string;
  blood_group: string;
  preferred_language: string;
  department_name: string;
  branch_name: string;
  branch_address: string;
  branch_contact: string;
  job_title: string;
  pay_grade: string;
  pay_grade_level: string;
  employment_status: string;
  supervisor_name: string;
}

export const getEmployeeBasicInfoByIDModel = async (
  id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetEmployeeBasicInfoByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      throw { data: null, error: "Employee not found", message: null };
    } else {
      return {
        data: (result[0] as EmployeeBasicInfo[])[0],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    throw {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};
export const getEmployeeBasicInfoByUserIDModel = async (
  user_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetEmployeeBasicInfoByUserID(?)", [user_id]);

    if (Array.isArray(result) && result.length === 0) {
      throw { data: null, error: "Employee not found", message: null };
    } else {
      return {
        data: (result[0] as EmployeeBasicInfo[])[0],
        error: null,
        message: null,
      };
    }
  } catch (error) {
    throw {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};

export const getAllEmployeesBasicInfoModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL GetAllEmployeeBasicInfos()");
    return {
      data: result[0] as EmployeeBasicInfo[],
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
