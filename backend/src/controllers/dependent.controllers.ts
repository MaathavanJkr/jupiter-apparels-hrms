import { Request, Response } from "express";
import db from "../database/database";
import { EmployeeDependent } from "../models/dependent.model";
import { ResultSetHeader } from "mysql2";


export const createEmployeeDependent = async (req:Request, res:Response) => {
    const {employee_id, name, relationship_to_employee, birth_date} = req.body;
    if (!employee_id || !name || !relationship_to_employee || !birth_date) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    try {
        await db
        .promise()
        .query(
            "INSERT INTO Employee_Dependent (dependent_id,employee_id, name, relationship_to_employee, birth_date) VALUES (UUID(),?,?,?,?)",
            [employee_id, name, relationship_to_employee, birth_date]
        );
        res.status(201).json({message: "Employee Dependent created successfully"});
    } catch (error) {
        res.status(500).json({error: "Database Query Failed", message: error});
    }
}

export const getEmployeeDependents = async (req: Request, res: Response) => {
    try {
        const [employeeDependents] = await db
        .promise()
        .query<EmployeeDependent[]>("SELECT * FROM Employee_Dependent");
        
        res.status(200).send(employeeDependents);
        
    } catch (error) {
        res.status(500).json({error: "Database Query failed", message: error});
    }
}

export const getEmployeeDependentByID = async (req:Request, res:Response) => {
    const id = req.params.id;

    try {
        const [employeeDependents] = await db
        .promise()
        .query<EmployeeDependent[]>("SELECT * FROM Employee_Dependent WHERE dependent_id = ?", [id]);
        if (employeeDependents.length === 0) {
            res.status(404).json({ message: `Employee Dependent with id: ${id} not found` });
        } else {
            res.status(200).json(employeeDependents[0]);
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const updateEmployeeDependent = async (req: Request, res:Response) => {
    const id = req.params.id;
    const { name, relationship_to_employee, birth_date} = req.body;
    try{
        const [result] = await db
        .promise()
        .query(
            "UPDATE Employee_Dependent SET name=?, relationship_to_employee=?, birth_date=? WHERE dependent_id = ?",
            [name, relationship_to_employee, birth_date, id]
        );
        if ((result as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({ message: "Employee Dependent updated successfully" });
        } else {
            res.status(404).json({ message: `Employee Dependent with id: ${id} not found` });
        }
    } catch(error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const deleteEmployeeDependent = async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
        .promise()
        .query(
            "DELETE FROM Employee_Dependent where dependent_id = ?", [id]
        );
        if ((result as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({
                message: `Employee Dependent with id: ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                message: `Employee Dependent with id: ${id} not found`
            });
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const getEmployeeDependentByEmployeeID = async (req:Request, res:Response) => {
    const id = req.params.employee_id;

    try {
        const [employeeDependents] = await db
        .promise()
        .query<EmployeeDependent[]>("SELECT * FROM Employee_Dependent WHERE employee_id = ?", [id]);
        res.status(200).json(employeeDependents);
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}