// need to check about adding coustom attributes.

import { RowDataPacket } from "mysql2";
import db from "../database/database"; 
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

enum Gender {
    Male = 'Male',
    Female = 'Female'
}

enum MaritalStatus {
    Single = 'Single',
    Married = 'Married',
    Divorced = 'Divorced',
    Widowed = 'Widowed'
}

export interface Employee extends RowDataPacket{
    employee_id?: string;
    department_id: string;
    branch_id: string;
    supervisor_id: string;
    first_name : string;
    last_name : string;
    birthday: Date;
    gender: Gender;
    marital_status: MaritalStatus;
    address: string;
    email: string;
    NIC: string;
    job_title_id: string;
    pay_grade_id:string;
    employee_status_id:string;
    contact_number: string;
}

export interface Supervisor extends RowDataPacket {
    supervisor_id?: string;
    full_name: string;

}


export const createEmployeeModel = async (employee: Employee): Promise<Output> => {
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
      contact_number
    } = employee;

    employee.employee_id = uuidv4();

    if (
      !department_id || !branch_id || !supervisor_id || !first_name || !last_name ||
      !birthday || !gender || !marital_status || !address || !email || !NIC ||
      !job_title_id || !pay_grade_id || !employee_status_id || !contact_number
    ) {
      return { error: "Missing required fields", data: null, message: null };
    }
  
    try {
      await db
        .promise()
        .query(
          `INSERT INTO employees (
            employee_id, department_id, branch_id, supervisor_id, first_name, last_name, birthday, 
            gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employee_status_id, contact_number
          ) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            department_id, branch_id, supervisor_id, first_name, last_name, birthday,
            gender, marital_status, address, email, NIC, job_title_id, pay_grade_id,
            employee_status_id, contact_number
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


  export const getEmployeeByIDModel = async (employee_id: string): Promise<Output> => {
    try {
      const [result] = await db
        .promise()
        .query("SELECT * FROM employees WHERE employee_id = ?", [employee_id]);
  
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
        error: error, message: "Database Query Failed",
      };
    }
  };


  export const getAllEmployeesModel = async (): Promise<Output> => {
    try {
      const [result] = await db.promise().query("SELECT * FROM employees");
      return { data: result as Employee[], error: null, message: null };
    } catch (error) {
      return {
        data: null,
        error: error, message: "Database Query Failed",
      };
    }
  };


  export const updateEmployeeModel = async (employee: Employee): Promise<Output> => {
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
      contact_number
    } = employee;
  
    
    if (
      !employee_id || !department_id || !branch_id || !supervisor_id || !first_name ||
      !last_name || !birthday || !gender || !marital_status || !address || !email ||
      !NIC || !job_title_id || !pay_grade_id || !employee_status_id || !contact_number
    ) {
      return { error: "Missing required fields", data: null, message: null };
    }
  
    try {
      await db
        .promise()
        .query(
          `UPDATE employees SET department_id = ?, branch_id = ?, supervisor_id = ?, first_name = ?, 
          last_name = ?, birthday = ?, gender = ?, marital_status = ?, address = ?, email = ?, 
          NIC = ?, job_title_id = ?, pay_grade_id = ?, employee_status_id = ?, contact_number = ? 
          WHERE employee_id = ?`,
          [
            department_id, branch_id, supervisor_id, first_name, last_name, birthday,
            gender, marital_status, address, email, NIC, job_title_id, pay_grade_id,
            employee_status_id, contact_number, employee_id
          ]
        );
      return {
        message: "Employee updated successfully",
        error: null,
        data: employee,
      };
    } catch (error) {
      return { error: error, message: "Database Query Failed", data: null };
    }
  };


  export const deleteEmployeeModel = async (employee_id: string): Promise<Output> => {
    if (!employee_id) {
      return { error: "Missing required fields", data: null, message: null };
    }
  
    try {
      await db
        .promise()
        .query("DELETE FROM employees WHERE employee_id = ?", [employee_id]);
      return {
        message: "Employee deleted successfully",
        error: null,
        data: { id: employee_id },
      };
    } catch (error) {
      return { error: error, message: "Database Query Failed", data: null };
    }
  };
  

