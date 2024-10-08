import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { v4 as uuidv4 } from "uuid";
import { Output } from "./output.model";

export interface EmergencyContact extends RowDataPacket {
  emergency_id?: string,
  employee_id: string,
  name: string,
  relationship: string,
  contact_number: string,
  address: string,
}

export const createEmergencyContactModel = async (
    contact: EmergencyContact
): Promise<Output> => {
  const { employee_id, name, relationship, contact_number, address } = contact;

  contact.emergency_id = uuidv4();

  if (!employee_id || !name || !relationship || !contact_number || !address) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query("CALL createEmergencyContact(?, ?, ?, ?, ?)",
            [employee_id, name, relationship, contact_number, address]
        );
    return {
      data: contact,
      message: "Emergency contact created successfully",
      error: null,
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const getEmergencyContactByIDModel = async (emergency_id: string): Promise<Output> => {
  try {
    const [result] = await db
        .promise()
        .query("CALL getEmergencyContactByID(?)", [emergency_id]);

    if (Array.isArray(result) && result.length === 0) {
      return { data: null, error: "Emergency contact not found", message: null };
    } else {
      return {
        data: (result as EmergencyContact[])[0],
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

export const getAllEmergencyContactsModel = async (): Promise<Output> => {
  try {
    const [result] = await db.promise().query("CALL getAllEmergencyContacts()");
    return { data: result as EmergencyContact[], error: null, message: null };
  } catch (error) {
    return {
      data: null,
      error: error,
      message: "Database Query Failed",
    };
  }
};

export const updateEmergencyContactModel = async (
    contact: EmergencyContact
): Promise<Output> => {
  const { emergency_id, employee_id, name, relationship, contact_number, address } = contact;

  if (!emergency_id || !employee_id || !name || !relationship || !contact_number || !address) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query("CALL updateEmergencyContact(?, ?, ?, ?, ?, ?)",
            [emergency_id, employee_id, name, relationship, contact_number, address]
        );
    return {
      message: "Emergency contact updated successfully",
      error: null,
      data: contact,
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};

export const deleteEmergencyContactModel = async (emergency_id: string): Promise<Output> => {
  if (!emergency_id) {
    return { error: "Missing required fields", data: null, message: null };
  }

  try {
    await db
        .promise()
        .query("CALL deleteEmergencyContact(?)", [emergency_id]);
    return {
      message: "Emergency contact deleted successfully",
      error: null,
      data: { id: emergency_id },
    };
  } catch (error) {
    return { error: error, message: "Database Query Failed", data: null };
  }
};
