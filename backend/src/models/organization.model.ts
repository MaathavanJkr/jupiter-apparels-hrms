import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

export interface Organization extends RowDataPacket {
  organization_id?: string;
  name: string;
  address: string;
  reg_no: number;
}

export const createOrganizationModel = async (
  organization: Organization
): Promise<Output> => {
  const { name, address, reg_no } = organization;

  organization.organization_id = uuidv4();

  if (!name || !address || !reg_no) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query(
        "INSERT INTO organizations (organization_id, name, address, reg_no) VALUES(UUID(),?,?,?)",
        [name, address, reg_no]
      );
    return {
      data: organization,
      message: "Organization created successfully",
      error: null,
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const getOrganizationByIDModel = async (id: string): Promise<Output> => {
  try {
    const [result] = await db
      .promise()
      .query("SELECT * FROM organizations WHERE organization_id = ?", [id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Organization not found", message: null };
    } else {
      return {
        data: (result as Organization[])[0],
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

export const getAllOrganizationsModel = async (): Promise<Output> => {
  try {
    const [result] = await db.promise().query("SELECT * FROM organizations");
    return { data: result as Organization[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Query Failed",
    };
  }
};

export const updateOrganizationModel = async (
  organization: Organization
): Promise<Output> => {
  const { organization_id, name, address, reg_no } = organization;

  if (!organization_id || !name || !address || !reg_no) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query(
        "UPDATE organizations SET name = ?, address = ?, reg_no = ? WHERE organization_id = ?",
        [name, address, reg_no, organization_id]
      );
    return {
      message: "Organization updated successfully",
      error: null,
      data: organization,
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};

export const deleteOrganizationModel = async (
  organization_id: string
): Promise<Output> => {
  if (!organization_id) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
      .promise()
      .query("DELETE FROM organizations WHERE organization_id = ?", [
        organization_id,
      ]);
    return {
      message: "Organization deleted successfully",
      error: null,
      data: { id: organization_id },
    };
  } catch (error) {
    return { error, message: "Database Query Failed", data: null };
  }
};
