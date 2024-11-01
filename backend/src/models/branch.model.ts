import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

export interface Branch extends RowDataPacket {
  branch_id?: string;
  name: string;
  address: string;
  contact_number: string;
  manager_id: string;
}

// Create Branch using stored procedure
export const createBranchModel = async (branch: Branch): Promise<Output> => {
  const { name, address, contact_number, manager_id } = branch;

  branch.branch_id = uuidv4();

  if (!name || !address || !contact_number) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL createBranch(?, ?, ?, ?)", [
        name,
        address,
        contact_number,
        manager_id || null,
      ]);

    return {
      data: branch,
      message: "Branch created successfully",
      error: null,
    };
  } catch (error) {
    throw { error: error, message: "Database Query Failed", data: null };
  }
};

// Get Branch by ID using stored procedure
export const getBranchByIDModel = async (id: string): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getBranchByID(?)", [id]);

    if (Array.isArray(result) && result.length === 0) {
      throw { data: null, error: "Branch not found", message: null };
    } else {
      return {
        data: (result[0] as Branch[])[0],
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

// Get All Branches using stored procedure
export const getAllBranchesModel = async (): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query<RowDataPacket[][]>("CALL getAllBranches()");
    return { data: result[0] as Branch[], error: null, message: null };
  } catch (error) {
    throw {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};

// Update Branch using stored procedure
export const updateBranchModel = async (branch: Branch): Promise<Output> => {
  const { branch_id, name, address, contact_number, manager_id } = branch;

  if (!branch_id || !name || !address || !contact_number) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("CALL updateBranch(?, ?, ?, ?, ?)", [
        branch_id,
        name,
        address,
        contact_number,
        manager_id || null,
      ]);

    return {
      message: "Branch updated successfully",
      error: null,
      data: branch,
    };
  } catch (error) {
    throw { error: error, message: "Database Query Failed", data: null };
  }
};

// Delete Branch using stored procedure
export const deleteBranchModel = async (branch_id: string): Promise<Output> => {
  if (!branch_id) {
    throw { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db.promise().query("CALL deleteBranch(?)", [branch_id]);
    return {
      message: "Branch deleted successfully",
      error: null,
      data: { id: branch_id },
    };
  } catch (error) {
    throw { error: error, message: "Database Query Failed", data: null };
  }
};
