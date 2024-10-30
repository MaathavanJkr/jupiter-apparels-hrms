import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

export interface Department extends RowDataPacket {
  department_id?: string;
  name: string;
}

// Create Department using stored procedure
export const createDepartmentModel = async (
  department: Department
): Promise<Output> => {
  const { name } = department;

  department.department_id = uuidv4();

  if (!name) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db.promise().query("CALL createDepartment(?)", [name]);

    return {
      data: department,
      message: "Department created successfully",
      error: null,
    };
  } catch (error) {
    throw { error: error, message: "Database Query Failed", data: null };
  }
};

// Get Department by ID using stored procedure
export const getDepartmentByIDModel = async (id: string): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getDepartmentByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      throw { data: null, error: "Department not found", message: null };
    } else {
      return {
        data: (result[0] as Department[])[0],
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

// Get All Departments using stored procedure
export const getAllDepartmentsModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getAllDepartments()");
    return { data: result[0] as Department[], error: null, message: null };
  } catch (error) {
    throw {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};

// Update Department using stored procedure
export const updateDepartmentModel = async (
  department: Department
): Promise<Output> => {
  const { department_id, name } = department;

  if (!department_id || !name) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL updateDepartment(?, ?)", [department_id, name]);

    return {
      message: "Department updated successfully",
      error: null,
      data: department,
    };
  } catch (error) {
    throw { error: error, message: "Database Query Failed", data: null };
  }
};

// Delete Department using stored procedure
export const deleteDepartmentModel = async (
  department_id: string
): Promise<Output> => {
  if (!department_id) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db.promise().query("CALL deleteDepartment(?)", [department_id]);
    return {
      message: "Department deleted successfully",
      error: null,
      data: { id: department_id },
    };
  } catch (error) {
    throw { error: error, message: "Database Query Failed", data: null };
  }
};

// Get Employee Count by Department ID using stored procedure
export const getEmployeeCountByDepartmentIDModel = async (
  id: string
): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getEmployeeCountByDepartmentID(?)", [id]);

    return {
      data: result[0],
      error: null,
      message: null,
    };
  } catch (error) {
    throw {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};
