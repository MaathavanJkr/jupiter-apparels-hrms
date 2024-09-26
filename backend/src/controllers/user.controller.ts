import { Request, Response } from "express";
import db from "../database/database";
import { User } from "../models/user.model";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
    const {employee_id, role, username,password} = req.body;

    if (!employee_id || !role || !username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);

    try {
        const [result] = await db
        .promise()
        .query (
            "INSERT INTO users (employee_id, role, username, password) VALUES(?,?,?,?)",
            [employee_id, role, username, hashedPassword]
        );
        res.status(201).json({id: (result as ResultSetHeader).insertId, message: "User created successfully"});
    } catch (error) {
        res.status(500).json({error: "Database Query Failed", message: error});
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const [users] = await db
        .promise()
        .query<User[]>("SELECT * FROM users");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "Database Query failed", message: error});
    }
}

export const getUserByID = async (req:Request, res:Response) => {
    const id = req.params.id;

    try {
        const [users] = await db
        .promise()
        .query<User[]>("SELECT * FROM users WHERE user_id = ?", [id]);
        if (users.length === 0) {
            res.status(404).json({ message: `User with id: ${id} not found` });
        } else {
            res.status(200).json(users[0]);
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const updateUser = async (req: Request, res:Response) => {
    const id = req.params.id;
    const { role, username, password} = req.body;

    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    try{
        const [result] = await db
        .promise()
        .query(
            "UPDATE users SET role=?, username=?, password=? WHERE user_id = ?",
            [role, username, hashedPassword??password, id]
        );
        if ((result as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: `User with id: ${id} not found` });
        }
    } catch(error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}

export const deleteUser = async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
        .promise()
        .query(
            "DELETE FROM users where user_id = ?", [id]
        );
        if ((result as ResultSetHeader).affectedRows > 0) {
            res.status(200).json({
                message: `User with id: ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                message: `User with id: ${id} not found`
            });
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}