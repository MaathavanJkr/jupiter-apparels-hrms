import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

enum Gender {
  Male = "Male",
  Female = "Female",
}

enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
}

export interface Employee extends RowDataPacket {
  employee_id?: string;
  department_id: string;
  branch_id: string;
  supervisor_id: string;
  first_name: string;
  last_name: string;
  birthday: Date;
  gender: Gender;
  marital_status: MaritalStatus;
  address: string;
  email: string;
  NIC: string;
  job_title_id: string;
  pay_grade_id: string;
  employee_status_id: string;
  contact_number: string;
  cust_attr_1_value: string;
  cust_attr_2_value: string;
  cust_attr_3_value: string;
}

export interface Supervisor extends RowDataPacket {
  supervisor_id?: string;
  full_name: string;
}

export const createEmployeeModel = async (
  employee: Employee
): Promise<Output> => {
  const {
    department_id,
    branch_id,
    supervisor_id,
    first_name,
    last_name,
    birthday,
    gender,
    marital_status,
    address,
    email,
    NIC,
    job_title_id,
    pay_grade_id,
    employee_status_id,
    contact_number,
    cust_attr_1_value,
    cust_attr_2_value,
    cust_attr_3_value,
  } = employee;

  employee.employee_id = uuidv4();

  if (
    !department_id ||
    !branch_id ||
    !supervisor_id ||
    !first_name ||
    !last_name ||
    !birthday ||
    !gender ||
    !marital_status ||
    !address ||
    !email ||
    !NIC ||
    !job_title_id ||
    !pay_grade_id ||
    !employee_status_id ||
    !contact_number
  ) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query(
        "CALL CreateEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          employee.employee_id,
          department_id,
          branch_id,
          supervisor_id,
          first_name,
          last_name,
          birthday,
          gender,
          marital_status,
          address,
          email,
          NIC,
          job_title_id,
          pay_grade_id,
          employee_status_id,
          contact_number,
          cust_attr_1_value,
          cust_attr_2_value,
          cust_attr_3_value,
        ]
      );
    return {
      data: employee,
      message: "Employee created successfully",
      error: null,
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const getEmployeeByIDModel = async (
  employee_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query("CALL GetEmployeeByID(?)", [employee_id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Employee not found", message: null };
    } else {
      return {
        data: (result as Employee[])[0],
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

export const getAllEmployeesModel = async (): Promise<Output> => {
  try {
    const [result] = await db.promise().query("CALL GetAllEmployees()");
    return { data: result as Employee[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

export const updateEmployeeModel = async (
  employee: Employee
): Promise<Output> => {
  const {
    employee_id,
    department_id,
    branch_id,
    supervisor_id,
    first_name,
    last_name,
    birthday,
    gender,
    marital_status,
    address,
    email,
    NIC,
    job_title_id,
    pay_grade_id,
    employee_status_id,
    contact_number,
    cust_attr_1_value,
    cust_attr_2_value,
    cust_attr_3_value,
  } = employee;

  if (
    !employee_id ||
    !department_id ||
    !branch_id ||
    !supervisor_id ||
    !first_name ||
    !last_name ||
    !birthday ||
    !gender ||
    !marital_status ||
    !address ||
    !email ||
    !NIC ||
    !job_title_id ||
    !pay_grade_id ||
    !employee_status_id ||
    !contact_number
  ) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query(
        "CALL UpdateEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          employee_id,
          department_id,
          branch_id,
          supervisor_id,
          first_name,
          last_name,
          birthday,
          gender,
          marital_status,
          address,
          email,
          NIC,
          job_title_id,
          pay_grade_id,
          employee_status_id,
          contact_number,
          cust_attr_1_value,
          cust_attr_2_value,
          cust_attr_3_value,
        ]
      );
    return {
      message: "Employee updated successfully",
      error: null,
      data: employee,
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};

export const deleteEmployeeModel = async (
  employee_id: string
): Promise<Output> => {
  if (!employee_id) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db.promise().query("CALL DeleteEmployee(?)", [employee_id]);
    return {
      message: "Employee deleted successfully",
      error: null,
      data: { id: employee_id },
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};
