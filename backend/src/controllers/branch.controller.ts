// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../database/database";
import { Branch } from "../models/branch.model";
import { ResultSetHeader } from "mysql2";

export const createBranch = async (req: Request, res: Response) => {
    const {name, address, contact_number, manager_id } = req.body;
    try {
        const [result] = await db
            .promise()
            .query(
                "INSERT INTO branches (name, address, contact_number, manager_id) VALUES (?, ?, ?, ?)",
                [name, address, contact_number, manager_id]
            );
        res.status(201).json({ id: (result as ResultSetHeader).insertId, message: "Branch created" });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}

export const getBranches = async (req: Request, res: Response) => {
    try {
        const [branches] = await db
            .promise()
            .query<Branch[]>("SELECT * FROM branches");
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
};

export const getBranchByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [branches] = await db
            .promise()
            .query<Branch[]>("SELECT * FROM branches WHERE id = ?", id);

        res.status(200).json(branches[0]);
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}

export const updateBranch = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, address, contact_number, manager_id } = req.body;
    try {
        await db
            .promise()
            .query(
                "UPDATE branches SET name = ?, address = ?, contact_number = ?, manager_id = ? WHERE id = ?",
                [name, address, contact_number, manager_id, id]
            );
        res.status(200).json({ message: "Branch updated" });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}


export const deleteBranch = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
            .promise()
            .query("DELETE FROM branches WHERE id = ?", id);
        res.status(200).json({ id: result, message: `Branch with id: ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}