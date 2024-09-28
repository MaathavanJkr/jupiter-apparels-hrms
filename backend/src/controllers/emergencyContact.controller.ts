import { Request, Response } from "express";
import db from "../database/database";
import { EmergencyContact } from "../models/emergencyContact.model";
import { ResultSetHeader } from "mysql2";

export const createEmergencyContact = async (req:Request, res:Response) => {
    const {employee_id, name, relationship, contact_number, address} = req.body;
    if (!employee_id || !name || !relationship || !contact_number || !address) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const [result] = await db
        .promise()
        .query(
            "INSERT INTO Emergency_Contact (employee_id, name, relationship, contact_number, address) VALUES (?,?,?,?,?)",
            [employee_id, name, relationship, contact_number, address]
        );
        res.status(201).json({id: (result as ResultSetHeader).insertId, message: "Emergency Contact created successfully"});
    } catch (error) {
        res.status(500).json({error: "Database Query Failed", message: error});
    }
}

export const getEmergencyContacts = async (req: Request, res: Response) => {
    try {
        const [emergencyContacts] = await db
        .promise()
        .query<EmergencyContact[]>("SELECT * FROM Emergency_Contact");
       
        res.status(200).send(emergencyContacts);
        
    } catch (error) {
        res.status(500).json({error: "Database Query failed", message: error});
    }
}

export const getEmergencyContactByID = async (req:Request, res:Response) => {
    const id = req.params.id;

    try {
        const [emergencyContacts] = await db
        .promise()
        .query<EmergencyContact[]>("SELECT * FROM Emergency_Contact WHERE emergency_id = ?", [id]);
        if (emergencyContacts.length === 0) {
            res.status(404).json({ message: `Employee Dependent with id: ${id} not found` });
        } else {
            res.status(200).json(emergencyContacts[0]);
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const updateEmergencyContact = async (req: Request, res:Response) => {
    const id = req.params.id;
    const { name, relationship, contact_number, address} = req.body;
    try{
        const [result] = await db
        .promise()
        .query(
            "UPDATE Emergency_Contact SET name=?, relationship=?, contact_number=?, address=? WHERE emergency_id = ?",
            [name, relationship, contact_number, address, id]
        );
        if ((result as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({ message: "Emergency Contact updated successfully" });
        } else {
            res.status(404).json({ message: `Emergency Contact with id: ${id} not found` });
        }
    } catch(error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const deleteEmergencyContact = async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
        .promise()
        .query(
            "DELETE FROM Emergency_Contact where emergency_id = ?", [id]
        );
        if ((result as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({
                message: `Emergency Contact with id: ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                message: `Emergency Contact with id: ${id} not found`
            });
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const getEmergencyContactByEmployeeID = async  (req:Request, res:Response) => {
    const employee_id = req.params.employee_id;

    try {
        const [emergencyContacts] = await db
        .promise()
        .query <EmergencyContact[]>(
            "SELECT * FROM Emergency_Contact WHERE employee_id = ?", [employee_id]
        );
        res.status(200).send(emergencyContacts);
    } catch (error) {
        res.status(500).json({error: "Database Query failed", message: error});
    }
}
