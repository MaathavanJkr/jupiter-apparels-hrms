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
        const [result] = await db
        .promise()
        .query (
            "INSERT INTO User (user_id, employee_id, role, username, password) VALUES(UUID(),?,?,?,?)",
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
        .query<User[]>("SELECT user_id, employee_id, role, username FROM User");
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
        .query<User[]>("SELECT user_id, employee_id, role, username FROM User WHERE user_id = ?", [id]);
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
            "UPDATE User SET role=?, username=? WHERE user_id = ?",
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
    const {oldPassword, newPassword} = req.body;
    try {
        const [users] = await db
        .promise()
        .query<User[]>("SELECT password FROM User WHERE user_id = ?", [id]);
        if (users.length === 0) {
            res.status(404).json({ message: `User with id: ${id} not found` });
        } else {
            if(compareSync(oldPassword,users[0].password)) {
                //password matching
                const hashedPassword = bcrypt.hashSync(newPassword, 10);
                const [result] = await db
                .promise()
                .query("UPDATE User SET password = ? WHERE user_id = ?" ,[hashedPassword,id]);

                if ((result as ResultSetHeader).affectedRows > 0) {
                    res.status(200).json({ message: "Password changed successfully" });
                }
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
            "DELETE FROM User where user_id = ?", [id]
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
            `SELECT 
                u.user_id AS user_id,
                e.employee_id AS employee_id,
                e.first_name AS first_name, 
                e.last_name AS last_name, 
                u.username AS username, 
                u.role AS role, 
                e.birth_date AS birth_date, 
                e.gender AS gender, 
                e.marital_status AS marital_status, 
                e.address AS address, 
                e.email AS email,
                e.NIC AS nic,
                d.name AS department_name, 
                b.name AS branch_name, 
                es.status AS employment_status, 
                j.title AS job_title,
                e.contact_number AS contact_number
            FROM User u
            INNER JOIN Employee e ON e.employee_id = u.employee_id
            INNER JOIN Department d ON d.department_id = e.department_id
            INNER JOIN Branch b ON b.branch_id = e.branch_id
            INNER JOIN Employment_Status es ON es.employment_status_id = e.employment_status_id
            INNER JOIN Job_Title j ON j.job_title_id = e.job_title_id`
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
            `SELECT 
                u.user_id AS user_id,
                e.employee_id AS employee_id,
                e.first_name AS first_name, 
                e.last_name AS last_name, 
                u.username AS username, 
                u.role AS role, 
                e.birth_date AS birth_date, 
                e.gender AS gender, 
                e.marital_status AS marital_status, 
                e.address AS address, 
                e.email AS email,
                e.NIC AS nic,
                d.name AS department_name, 
                b.name AS branch_name, 
                es.status AS employment_status, 
                j.title AS job_title,
                e.contact_number AS contact_number
            FROM User u
            INNER JOIN Employee e ON e.employee_id = u.employee_id
            INNER JOIN Department d ON d.department_id = e.department_id
            INNER JOIN Branch b ON b.branch_id = e.branch_id
            INNER JOIN Employment_Status es ON es.employment_status_id = e.employment_status_id
            INNER JOIN Job_Title j ON j.job_title_id = e.job_title_id`
        );
        if (result.length === 0) {
            res.status(404).json({ message: `User with id: ${id} not found` });
        } else {
            res.status(200).json(result[0]);
        }
    } catch (error) {
        res.status(500).json({error: "Database query failed", message: error});
    }
}