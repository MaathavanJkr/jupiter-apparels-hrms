import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

export interface EmployeeDependent extends RowDataPacket {
  dependent_id?: string;
  employee_id: string;
  name: string;
  relationship_to_employee: string;
  birth_date: Date;
}

export const createEmployeeDependentModel = async (
  dependent: EmployeeDependent
): Promise<Output> => {
  const { employee_id, name, relationship_to_employee, birth_date } = dependent;

  dependent.dependent_id = uuidv4();

  if (!employee_id || !name || !relationship_to_employee || !birth_date) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL createEmployeeDependent(?, ?, ?, ?)", [
        employee_id,
        name,
        relationship_to_employee,
        birth_date,
      ]);
    return {
      data: dependent,
      message: "Employee Dependent created successfully",
      error: null,
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const getEmployeeDependentByIDModel = async (
  dependent_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getEmployeeDependentByID(?)", [
        dependent_id,
      ]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Dependent not found", message: null };
    } else {
      return {
        data: (result[0] as EmployeeDependent[])[0],
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

export const getAllEmployeeDependentsModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getAllEmployeeDependents()");
    return {
      data: result[0] as EmployeeDependent[],
      error: null,
      message: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};

export const updateEmployeeDependentModel = async (
  dependent: EmployeeDependent
): Promise<Output> => {
  const {
    dependent_id,
    employee_id,
    name,
    relationship_to_employee,
    birth_date,
  } = dependent;

  if (
    !dependent_id ||
    !employee_id ||
    !name ||
    !relationship_to_employee ||
    !birth_date
  ) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL updateEmployeeDependent(?, ?, ?, ?, ?)", [
        dependent_id,
        employee_id,
        name,
        relationship_to_employee,
        birth_date,
      ]);
    return {
      message: "Employee Dependent updated successfully",
      error: null,
      data: dependent,
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const deleteEmployeeDependentModel = async (
  dependent_id: string
): Promise<Output> => {
  if (!dependent_id) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db.promise().query("CALL deleteEmployeeDependent(?)", [dependent_id]);
    return {
      message: "Employee Dependent deleted successfully",
      error: null,
      data: { id: dependent_id },
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const getEmployeeDependentByEmployeeIDModel = async (
  emp_id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getEmployeeDependentByEmployeeID(?)", [
        emp_id,
      ]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Dependent not found", message: null };
    } else {
      return {
        data: (result[0] as EmployeeDependent[]),
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
