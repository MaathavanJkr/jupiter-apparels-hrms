// src/models/emergencyMedicalDetailsView.model.ts
import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface EmergencyMedicalDetails extends RowDataPacket {
    employee_id: string;
    employee_name: string;
    department: string;
    branch: string;
    gender: string;
    blood_group: string;
    person_to_contact: string;
    relationship: string;
    contact_number: string;
    address: string;
}

// Function to get emergency medical details for employees
export const getEmergencyMedicalDetailsModel = async (): Promise<Output> => {
    try {
        const [result] = await db.promise().query("CALL GetEmergencyMedicalDetails()");
        return { data: result as EmergencyMedicalDetails[], error: null, message: null };
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
};

// Function to get emergency medical details by employee ID
export const getEmergencyMedicalDetailsByIDModel = async (employeeId: string): Promise<Output> => {
    try {
        const [result] = await db.promise().query("CALL GetEmergencyMedicalDetailsByID(?)", [employeeId]);
        return { data: result as EmergencyMedicalDetails[], error: null, message: null };
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
};