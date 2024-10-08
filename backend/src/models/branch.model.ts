import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

export interface Branch extends RowDataPacket{
    branch_id?: string;
    name: string;
    address: string;
    contact_number: string;
    manager_id : string;
}


// need to check. manager_id can be null value 
export const createBranchModel = async (branch: Branch): Promise<Output> => {
    const { name, address, contact_number, manager_id } = branch;
  

    branch.branch_id = uuidv4();
  
    if (!name || !address || !contact_number || !manager_id) {
      return { error: "Missing required fields", data: null, message: null };
    }
  
    try {
        await db
        .promise()
        .query(
          "INSERT INTO branches (branch_id, name, address, contact_number, manager_id) VALUES(UUID(),?,?,?,?)",
          [name, address, contact_number, manager_id]
        );
  
      return {
        data: branch,
        message: "Branch created successfully",
        error: null,
      };
    } catch (error) {
      return { error: error,message: "Database Query Failed", data: null };
    }
  };

  
  export const getBranchByIDModel = async (id: string): Promise<Output> => {
    try {
      const [result] = await db
        .promise()
        .query("SELECT * FROM branches WHERE branch_id = ?", [id]);
  
      if (Array.isArray(result) && result.length === 0) {
        return { data: null, error: "Branch not found", message: null };
      } else {
        return {
          data: (result as Branch[])[0],
          error: null,
          message: null,
        };
      }
    } catch (error) {
      return {
        data: null,
        error: error,message: "Database Query Failed",
      };
    }
  };


  export const getAllBranchesModel = async (): Promise<Output> => {
    try {
      const [result] = await db.promise().query("SELECT * FROM branches");
      return { data: result as Branch[], error: null, message: null };
    } catch (error) {
      return {
        data: null,
        error: error,message: "Database Query Failed",
      };
    }
  };
  
  // need to check
  export const updateBranchModel = async (branch: Branch): Promise<Output> => {
    const { branch_id, name, address, contact_number, manager_id } = branch;
  
    if (!branch_id || !name || !address || !contact_number || !manager_id) {
      return { error: "Missing required fields", data: null, message: null };
    }
  
    try {
      await db
        .promise()
        .query(
          "UPDATE branches SET name = ?, address = ?, contact_number = ?, manager_id = ? WHERE branch_id = ?",
          [name, address, contact_number, manager_id, branch_id]
        );
      return {
        message: "Branch updated successfully",
        error: null,
        data: branch,
      };
    } catch (error) {
      return { error: error, message: "Database Query Failed", data: null };
    }
  };
  

  export const deleteBranchModel = async (branch_id: string): Promise<Output> => {
    if (!branch_id) {
      return { error: "Missing required fields", data: null, message: null };
    }
  
    try {
      await db
        .promise()
        .query("DELETE FROM branches WHERE branch_id = ?", [branch_id]);
      return {
        message: "Branch deleted successfully",
        error: null,
        data: { id : branch_id },
      };
    } catch (error) {
      return { error: error, message: "Database Query Failed", data: null };
    }
  };
  
