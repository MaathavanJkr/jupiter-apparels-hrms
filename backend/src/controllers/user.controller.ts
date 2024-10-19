import { Request, Response } from "express";
import db from "../database/database";
import bcrypt from "bcryptjs";
import { UserInfo } from "../models/userInfo.model";

// Need to Implement the below functions

export const createUser = async (req: Request, res: Response) => {
  const { employee_id, role, username, password } = req.body;

  if (!employee_id || !role || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

  res.status(200).json({ message: "User created successfully" });
};

export const getUserByID = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json({ message: `User with id: ${id} found` });
};

export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json({ message: "All users found" });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { employee_id, role, username, password } = req.body;

  if (!employee_id || !role || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  res.status(200).json({ message: `User with id: ${id} updated successfully` });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json({ message: `User with id: ${id} deleted successfully` });
};

export const changePassword = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  res.status(200).json({ message: `Password changed successfully for ${id}` });
};

// Need to Implement the above functions

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const [result] = await db.promise().query<UserInfo[]>(
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
            FROM users u
            INNER JOIN employees e ON e.employee_id = u.employee_id
            INNER JOIN departments d ON d.department_id = e.department_id
            INNER JOIN branches b ON b.branch_id = e.branch_id
            INNER JOIN employment_statuses es ON es.employment_status_id = e.employment_status_id
            INNER JOIN job_titles j ON j.job_title_id = e.job_title_id`
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Database Query failed", message: error });
  }
};

export const getUserInfoByID = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const [result] = await db.promise().query<UserInfo[]>(
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
                e.contact_number AS contact_number,
                p.grade_name AS pay_grade_name,
                e.supervisor_id AS supervisor_id
            FROM users u
            INNER JOIN employees e ON e.employee_id = u.employee_id
            INNER JOIN departments d ON d.department_id = e.department_id
            INNER JOIN branches b ON b.branch_id = e.branch_id
            INNER JOIN employment_statuses es ON es.employment_status_id = e.employment_status_id
            INNER JOIN job_titles j ON j.job_title_id = e.job_title_id
            INNER JOIN pay_grades p ON p.pay_grade_id = e.pay_grade_id
            WHERE u.user_id = ?`,
      [id]
    );
    if (result.length === 0) {
      res.status(404).json({ message: `User with id: ${id} not found` });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Database query failed", message: error });
  }
};
