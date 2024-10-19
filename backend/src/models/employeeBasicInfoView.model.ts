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
      .query("CALL GetEmployeeBasicInfoByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Employee not found", message: null };
    } else {
      return {
        data: (result as EmployeeBasicInfo[])[0],
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

export const getAllEmployeesBasicInfoModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query("CALL GetAllEmployeeBasicInfos()");
    return { data: result as EmployeeBasicInfo[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};
