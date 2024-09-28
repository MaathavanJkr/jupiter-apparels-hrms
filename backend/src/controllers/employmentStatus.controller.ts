import { Request, Response } from "express";
import db from "../database/database";
import { EmploymentStatus } from "../models/employmentStatus.model";
import { ResultSetHeader } from "mysql2";

export const createEmploymentStatus = async (req: Request, res: Response) => {
    const {status} = req.body;
    if (!status) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const [result] = await db
        .promise()
        .query(
            "INSERT INTO Employment_Status (employment_status_id,status) VALUES (UUID(),?)",
            [status]
        );
        res.status(201).json({id: (result as ResultSetHeader).insertId, message: "Employment Status created successfully"});
    } catch (error) {
        res.status(500).json({error: "Database Query Failed", message: error});
    }
}

export const getEmploymentStatuses = async (req: Request, res: Response) => {
    try {
        const [statuses] = await db
        .promise()
        .query<EmploymentStatus[]>("SELECT * FROM Employment_Status");
        res.status(200).json(statuses);
    } catch (error) {
        res.status(500).json({error: "Database Query failed", message: error});
    }
}

export const getEmploymentStatusByID = async (req:Request, res:Response) => {
    const id = req.params.id;

    try {
        const [statuses] = await db
        .promise()
        .query<EmploymentStatus[]>("SELECT * FROM Employment_Status WHERE  employment_status_id = ?", [id]);
        if (statuses.length === 0) {
            res.status(404).json({ message: `Employment Status with id: ${id} not found` });
        } else {
            res.status(200).json(statuses[0]);
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const updateEmploymentStatus = async (req: Request, res:Response) => {
    const id = req.params.id;
    const {status} = req.body;

    
    
    try{
        const [result] = await db
        .promise()
        .query(
            "UPDATE Employment_Status SET status=? WHERE  employment_status_id = ?",
            [status, id]
        );
        if ((result as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({ message: "Employment Status updated successfully" });
        } else {
            res.status(404).json({ message: `Employment Status with id: ${id} not found` });
        }
    } catch(error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const deleteEmploymentStatus = async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
        .promise()
        .query(
            "DELETE FROM Employment_Status where employment_status_id = ?", [id]
        );
        if ((result as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({
                message: `Employment Status with id: ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                message: `Employment Status with id: ${id} not found`
            });
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}