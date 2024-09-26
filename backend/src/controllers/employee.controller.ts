// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../database/database";
import { Employee } from "../models/employee.model";
import { ResultSetHeader } from "mysql2";

export const createEmployee = async (req: Request, res: Response) => {
    const { department_id,branch_id,supervisor_id,first_name,last_name,birthday,
        gender,marital_status,address,email,NIC,
        job_title_id,pay_grade_id,employee_status_id } = req.body;
    try {
        const [result] = await db
            .promise()
            .query(
                "INSERT INTO employees (department_id,branch_id,supervisor_id,first_name,last_name,birthday,gender,marital_status,address,email,NIC,job_title_id,pay_grade_id,employee_status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,? , ?, )",
                [department_id, branch_id, supervisor_id, first_name, last_name, birthday, gender, marital_status, address, email, NIC, job_title_id, pay_grade_id, employee_status_id]
            );
        res.status(201).json({ id: (result as ResultSetHeader).insertId, message: "Employee created" });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const [employees] = await db
            .promise()
            .query<Employee[]>("SELECT * FROM employees");
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
};

export const getEmployeeByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [employees] = await db
            .promise()
            .query<Employee[]>("SELECT * FROM employees WHERE id = ?", id);

        res.status(200).json(employees[0]);
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { department_id,branch_id,supervisor_id,first_name,last_name,birthday,
        gender,marital_status,address,email,NIC,
        job_title_id,pay_grade_id,employee_status_id } = req.body;
    try {
        await db
            .promise()
            .query(
                "UPDATE employees SET department_id = ?, branch_id = ?, supervisor_id = ?, first_name = ?, last_name = ?, birthday = ?, gender = ?,marital_status = ?, address = ?, email = ?, NIC = ?, job_title_id = ?, pay_grade_id = ?,employee_status_id = ?  WHERE id = ?",
                [department_id,branch_id,supervisor_id,first_name,last_name,birthday,gender,marital_status,address,email,NIC,job_title_id,pay_grade_id,employee_status_id, id]
            );
        res.status(200).json({ message: "Organization updated" });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}


export const deleteEmployee = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [result] = await db
            .promise()
            .query("DELETE FROM employees WHERE id = ?", id);
        res.status(200).json({ id: result, message: `Employee with id: ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: "Database query failed", message: error });
    }
}