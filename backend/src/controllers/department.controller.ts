// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../database/database";
import { Department } from "../models/department.model";
import { ResultSetHeader } from "mysql2";

export const createDepartment = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const [result] = await db
            .promise()
            .query(
                "INSERT INTO departments (name) VALUES (?)",
                [name]
            );
        res.status(201).json({ id: (result as ResultSetHeader).insertId, message: "Department created" });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}

export const getDepartments = async (req: Request, res: Response) => {
    try {
        const [departments] = await db
            .promise()
            .query<Department[]>("SELECT * FROM departments");
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
};

export const getDepartmentByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [departments] = await db
            .promise()
            .query<Department[]>("SELECT * FROM departments WHERE id = ?", id);

        res.status(200).json(departments[0]);
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}

export const updateDepartment = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        await db
            .promise()
            .query(
                "UPDATE departments SET name = ? WHERE id = ?",
                [name, id]
            );
        res.status(200).json({ message: "Department updated" });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}


export const deleteDepartment = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
            .promise()
            .query("DELETE FROM departments WHERE id = ?", id);
        res.status(200).json({ id: result, message: `Department with id: ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}