import { Request, Response } from "express";
import db from "../database/database";
import { User } from "../models/user.model";
import { ResultSetHeader } from "mysql2";
import bcrypt, { compareSync } from "bcryptjs";
import { UserInfo } from "../models/userInfo.model";

export const createUser = async (req: Request, res: Response) => {
    const {employee_id, role, username,password} = req.body;

    if (!employee_id || !role || !username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);

    try {
        const [users] = await db
        .promise()
        .query<User[]>(
            "SELECT user_id FROM users WHERE employee_id = ?", [employee_id]
        );
        if (users.length > 0) {
            return res.status(400).json({ error: "User account for this employee already Exists" });
        }
        const [result] = await db
        .promise()
        .query (
            "INSERT INTO users (user_id, employee_id, role, username, password) VALUES(UUID(),?,?,?,?)",
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
        .query<User[]>("SELECT user_id, employee_id, role, username FROM users");
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
        .query<User[]>("SELECT user_id, employee_id, role, username FROM users WHERE user_id = ?", [id]);
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
    const { role, username} = req.body;
    
    try{
        const [result] = await db
        .promise()
        .query(
            "UPDATE users SET role=?, username=? WHERE user_id = ?",
            [role, username, id]
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

export const changePassword = async (req: Request, res: Response) => {
    const id = req.params.id;
    const {old_password, new_password} = req.body;
    try {
        const [users] = await db
        .promise()
        .query<User[]>("SELECT password FROM users WHERE user_id = ?", [id]);
        if (users.length === 0) {
            res.status(404).json({ message: `User with id: ${id} not found` });
        } else {
            if(compareSync(old_password,users[0].password)) {
                //password matching
                const hashedPassword = bcrypt.hashSync(new_password, 10);
                const [result] = await db
                .promise()
                .query("UPDATE users SET password = ? WHERE user_id = ?" ,[hashedPassword,id]);

                if ((result as ResultSetHeader).affectedRows > 0) {
                    res.status(200).json({ message: "Password changed successfully" });
                }
            } else {
                return res.status(401).json({ message: "Old password is incorrect" });
            }
        }
    } catch (error) {
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

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const [result] = await db
        .promise()
        .query<UserInfo[]>(
            `SELECT * FROM user_employee`
        );
        res.status(200).json(result);
    } catch(error){
        res.status(500).json({error: "Database Query failed", message: error});
    }
} 

export const getUserInfoByID = async (req:Request,res:Response) => {
    const id = req.params.id;

    try {
        const [result] = await db
        .promise()
        .query<UserInfo[]>(
            `SELECT * FROM user_employee WHERE user_id = ?`, [id]
        );
        if (result.length === 0) {
            res.status(404).json({ message: `user info for  id: ${id} not found` });
        } else {
            res.status(200).json(result[0]);
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}